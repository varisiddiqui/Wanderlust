const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

require("dotenv").config();

const MONGO_URL = process.env.ATLASDB_URL;

async function initDB() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB");

        await Listing.deleteMany({});

        const data = initData.data.map((obj) => ({
            ...obj,
            owner: "67fbcee178a7cc4e2a1e640c",
        }));

        await Listing.insertMany(data);

        console.log("Data was initialized");
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.connection.close();
    }
}

initDB();

