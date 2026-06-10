const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

router.post(
    "/:id/reviews",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview)
);

router.delete(
    "/fire/:id/reviews/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;
