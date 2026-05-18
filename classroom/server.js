const express = require("express");
const app = express();
const session = require("express-session");

const sessionOptions = ({
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true
})

app.use(session(sessionOptions));

app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    res.redirect("/hello")

})

app.get("/hello", (req, res) => {
        res.send(`hello, ${req.session.name}`)
    })
    // app.get("/test", (req, res) => {
    //     res.send("test successful");
    // })

app.get("/reqcount", (req, res) => {
    if (req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1
    }
    res.send(`you send a request ${req.session.count}`);
})

app.listen(3000, (req, res) => {
    console.log("listening to port on 3000")
})



// One-time migration route
router.get("/debug/transfer-all", isLoggedIn, async(req, res) => {
    const oldOwnerId = "69465c22c96b1aedd3e88258"; // Old user ID
    const newOwnerId = req.user._id; // Your current user ID

    const result = await Listing.updateMany({ owner: oldOwnerId }, { owner: newOwnerId });

    res.send(`Transferred ${result.modifiedCount} listings to your account`);
});


router.get("/:id", wrapAsync(async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect("/listings");
    }
    console.log("Listing owner:", listing.owner);
    console.log("Current user:", req.user);
    res.render("listings/show.ejs", { listing, currUser: req.user });
}));