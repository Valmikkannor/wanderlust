const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");
const listingControllers = require("../controllers/listing")

//index and create route
router.route("/")
    .get(wrapAsync(listingControllers.index))
    .post(isLoggedIn, validateListing, wrapAsync(listingControllers.createListing));


//new Route
router.get("/new", isLoggedIn, listingControllers.renderNewForm)


//show update and delete route
router.route("/:id")
    .get(wrapAsync(listingControllers.showListing))
    .put(isOwner, isLoggedIn, validateListing, wrapAsync(listingControllers.updateListing))
    .delete(isOwner, isLoggedIn, wrapAsync(listingControllers.destroyListing));


//Edit Route
router.get("/:id/edit", isOwner, isLoggedIn, wrapAsync(listingControllers.editListing))


module.exports = router