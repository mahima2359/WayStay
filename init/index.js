if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const mongoose = require("mongoose"); 
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const DB_NAME = "Airbnb";
const mongoUrl = process.env.ATLAS_DB || "mongodb://127.0.0.1:27017/Airbnb";

async function main() {
    await mongoose.connect(mongoUrl, { dbName: DB_NAME });
    console.log(`Connected to MongoDB database: ${DB_NAME}`);

    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log(`Seeded ${initData.data.length} listings into "${DB_NAME}" database.`);
}

main()
    .then(() => {
        console.log("Data was initialized successfully.");
        process.exit(0);
    })
    .catch((err) => {
        console.error("Error initializing data:", err);
        process.exit(1);
    });
