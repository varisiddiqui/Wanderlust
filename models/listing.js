const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    
    description: String,

    image: {
        url: String,
        filename : String,
      },

   /*  image: {
        filename: { type: String, default: "listingimage" },
        url: { type: String, default: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=620&auto=format&fit=crop&q=60" }
    }, */
    price: {
      type: Number,
      required: true,
    },
    location: String,
    country: String,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    geometry: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
      },
      coordinates: {
        type: [Number],
      }
    }
});

listingSchema.post("findOneAndDelete", async(listing) => {
  if(listing){
  await Review.deleteMany({_id: {$in : listing.reviews}});
  }
});



const Listing = mongoose.model("Listing", listingSchema); // created model now it will be mapped to collection Listings

module.exports = Listing;