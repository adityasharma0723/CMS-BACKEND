const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const otpSchema = new mongoose.Schema(
    {
        email: String,
        otp: String,
        expireAt: Date,
    },
    { timestamps: true },
);

module.exports = mongoose.model("OTP", otpSchema);