const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register
exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      licenseNumber = "",
      organization = "",
      walletAddress
    } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const user = await User.create({
      name,
      email,
      password,
      role,
      licenseNumber,
      organization,
      walletAddress
    });

    const token = generateToken(user);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.role !== role)
      return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = generateToken(user);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Send OTP (Forgot Password Step 1)
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 10 * 60 * 1000;

    user.resetOTP = otp;
    user.otpExpiry = expiry;
    await user.save();

    const getOTPTemplate = (otp) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
    <h2 style="color: #4f46e5;">🔐 MedChain OTP Verification</h2>
    <p>Hi there,</p>
    <p>We received a request to access your MedChain account. Please use the following One-Time Password (OTP) to continue:</p>
    <div style="text-align: center; margin: 20px 0;">
      <span style="font-size: 28px; font-weight: bold; color: #111; letter-spacing: 2px; padding: 10px 20px; background: #e0e7ff; border-radius: 8px; display: inline-block;">
        ${otp}
      </span>
    </div>
    <p>This OTP will expire in <strong>10 minutes</strong>.</p>
    <p>If you didn't request this, please ignore this email or contact support.</p>
    <br />
    <p>Regards,<br />MedChain Team</p>
    <hr style="margin-top: 30px;" />
    <p style="font-size: 12px; color: #666;">© ${new Date().getFullYear()} MedChain. All rights reserved.</p>
  </div>
`;

    await sendEmail(email, "Your MedChain OTP Code", getOTPTemplate(otp));
    res.json({ msg: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Verify OTP (Step 2)
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.resetOTP !== otp || Date.now() > user.otpExpiry) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    // Optional: You can return a short-lived token for resetting password
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.json({ msg: "OTP verified", resetToken });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Reset Password (Step 3)
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword, otp } = req.body;

    const user = await User.findOne({
      email,
      otpExpiry: { $gt: Date.now() },
    });

    if (!user || user.resetOTP !== otp) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    user.password = newPassword;
    user.resetOTP = null;
    user.otpExpiry = null;

    await user.save();
    res.status(200).json({ msg: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
