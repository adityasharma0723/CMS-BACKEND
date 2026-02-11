const User = require("../models/user.model");
const OTP = require("../models/otp.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
exports.sendOTP = async (req, res) => {
    if (!req.body) return res.status(400).json({ message: "Request body is missing" });
    const { email } = req.body;
    const otp = otpGenerator.generate(6, { digits: true });
    const expireAt = new Date(Date.now() + 5 * 60 * 1000)
    await OTP.create({ email, otp, expireAt });
    await transporter.sendMail({
        to: email,
        subject: "OTP Verification",
        text: `Your OTP is ${otp}`,
    });
    res.json({ message: "OTP Sent" });
};
exports.verifyOTP = async (req, res) => {
    if (!req.body) return res.status(400).json({ message: "Request body is missing" });
    const { email, otp } = req.body;
    const record = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!record) return res.status(400).json({ message: "Invalid OTP" });

    // Compare as strings
    if (String(otp) !== String(record.otp)) return res.status(400).json({ message: "Invalid OTP" });

    if (record.expireAt < new Date()) return res.status(400).json({ message: "OTP Expired" });
    await User.updateOne({ email }, { $set: { isverified: true } });
    res.json({ message: "OTP Verified" });
};

exports.signup = async (req, res) => {
    if (!req.body) return res.status(400).json({ message: "Request body is missing" });
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ email, password });
    res.status(201).json({ message: "User Created", userId: user._id });
}
exports.login = async (req, res) => {
    if (!req.body) return res.status(400).json({ message: "Request body is missing" });
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid Password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
}