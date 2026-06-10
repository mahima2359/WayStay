if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const ExError = require("./utils/ExError.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const PORT = process.env.PORT || 8080;
const dbUrl = process.env.ATLAS_DB || "mongodb://127.0.0.1:27017/Airbnb";
const sessionSecret = process.env.SECRET || "dev-only-change-in-production";

if (process.env.NODE_ENV === "production" && !process.env.ATLAS_DB) {
    console.error("ATLAS_DB environment variable is required in production.");
    process.exit(1);
}

async function main() {
    await mongoose.connect(dbUrl, {
        dbName: "Airbnb",
    });
}

main()
    .then(() => {
        console.log("Successfully Connected Mongoose");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", engine);

// Required behind Render/Heroku HTTPS proxy so sessions work correctly
if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
}

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: sessionSecret,
    },
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("Error in MONGODB SESSION", err);
});

const sessionOption = {
    store,
    name: "waystay.sid",
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "lax" : "lax",
    },
};

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.errorMsg = req.flash("error");
    res.locals.successMsg = req.flash("success");
    res.locals.currentUser = req.user || null;
    res.locals.mapToken = process.env.MAP_TOKEN || "";
    next();
});

app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.get("/health", (req, res) => {
    res.status(200).send("ok");
});

app.use("/listings", listingRouter);
app.use("/listings", reviewRouter);
app.use("/", userRouter);

app.all("*", (req, res, next) => {
    next(new ExError(404, "Page Not Found !!!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong..." } = err;
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
});
