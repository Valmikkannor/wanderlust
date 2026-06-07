require("dotenv").config();

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_URL = process.env.MONGO_URL;

main()
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(mongo_URL);
}

const initDB = async() => {
    await Listing.deleteMany({});

    const ownerId = new mongoose.Types.ObjectId(
        "69466d4958a95d781fe29608"
    );

    const dataWithOwner = initData.data.map((obj) => ({
        ...obj,
        owner: ownerId,
    }));

    await Listing.insertMany(dataWithOwner);

    console.log("Data was initialized");
};

initDB();