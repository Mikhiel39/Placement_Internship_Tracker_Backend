// Step 1: Calling models that are required
const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");

// Send OTP

// a. Creating send otp function.
exports.sendOTP = async (req, res) => {
  try {
    // a.1 fetch email from request body
    const { email } = req.body;

    // a.2 check if user already exists
    const checkUserPresent = await User.findOne({ email });

    // if User already exists, then return a response
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    // a.3 Generate OTP
    // Here we can define the specification of OTP like length
    var otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });
    console.log("OTP generated:", otp);

    // Check whether the OTP generated is unique or not
    let result = await OTP.findOne({ otp });
    // until and unless I am not getting a unique OTP, I will continuously generate a new OTP
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCase: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp });
    }

    // a.4 As our OTP generated then now make its entry in the Database
    const otpPayload = { email, otp };

    // create an entry for OTP
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    // return response successfully
    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//************************************************************** */

// Sign up
exports.signUp = async (req, res) => {
  try {
    // 1. Data fetch from req body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    // 2. Validate the received data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    // 3. Matching both password and confirm password
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password are not same. Please try again",
      });
    }

    // 4. Check whether user already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered!",
      });
    }

    // 5. Find the most recent OTP
    const recentOtp = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOtp);

    // 6. Validate OTP
    if (!recentOtp) {
      // OTP not found
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== recentOtp.otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // 7. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 8. Create entry in DB
    // create an entry of an object in the database
    // 7.a Creating profileDetail section as we need its object id in case of adding a user in the DB.
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`,
    });

    // 9. Return the response
    return res.status(200).json({
      success: true,
      message: "Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User is not Registered Yet",
    });
  }
};

//Login
exports.loginIn = async (req, res) => {
  try {
    // 1. Data fetch from req body
    const { email, password } = req.body;

    // 2. Validate the received data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    // 3. Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not registered",
      });
    }

    // 4. Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Password is wrong. Please try again",
      });
    }

    // 5. Return the response
    return res.status(200).json({
      success: true,
      message: "Logged in Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};
//change password
exports.changePassword = async (req, res) => {
  try {
    // 1. Data fetch from req body
    const { password, confirmPassword } = req.body;

    // 2. Validate the received data
    if (!password || !confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const user = await User.findOne({ password });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not registered",
      });
    }

    // 4. Compare passwords
    if (password === confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password should be different from the old one",
      });
    }


    // You should hash the new password before updating it in the database
    const hashedPassword = await bcrypt.hash(confirmPassword, 10);
    const updatedUser = await User.updateOne(
      { email: user.email },
      { password: hashedPassword }
    );

    // Assuming you have successfully updated the password, return the response
    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error Occurred",
    });
  }
};
