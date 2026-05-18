const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js")

const mongo_URL = "mongodb://localhost:27017/wanderlust"

main().then(() => {
        console.log("connected to db")
    })
    .catch((err) => {
        console.log(err)
    })

async function main() {
    await mongoose.connect(mongo_URL)
}

const initDB = async() => {
    await Listing.deleteMany({});
    const ownerId = new mongoose.Types.ObjectId("69466d4958a95d781fe29608");

    const dataWithOwner = initData.data.map((obj) => ({
        ...obj,
        owner: ownerId
    }));

    await Listing.insertMany(dataWithOwner);
    console.log("data was initialized");
}

initDB()