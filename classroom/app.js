const express = require("express");
const session = require("express-session");
const passport = require("passport");

const app = express()

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// 🔥 THIS MUST COME HERE
app.use((req, res, next) => {
    res.locals.currUser = req.user;
    next();
});

// ⬇️ routes AFTER this
app.use("/listings", listingsRouter);

app.get("/debug-user", (req, res) => {
    res.send({
        user: req.user,
        currUser: res.locals.currUser
    });
});

app.listening(4000, (req, res) => {
    console.log("post is ready");
})