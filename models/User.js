const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        accountCreatedDate: {
            type: Date,
            default: Date.now,
        },
        experience: {
            type: Number,
            default: 0,
        },
        properties: {
            type: Array,
            default: [],
        },
        balance: {
            type: Number,
            default: 50000,
        },
        maxProperties: {
            type: Number,
            default: 5,
        },
        location: {
          type: [Number],
          index: `2dsphere`,
        },
        multiplier: {
            type: Number,
            default: 1.0,
        }
    }
);

userSchema.index({location: "2dsphere"});
module.exports = mongoose.model("User", userSchema);