import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { emailValidate } from "../utils/validateInputs.js";
import { generateJWTToken } from "../utils/generateToken.js";
import { v2 as cloudinary } from "cloudinary";

const signUp = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, profilePic } = req.body;
    if (!fullName || !email || !password || !confirmPassword)
      return res.status(400).json({
        success: false,
        message: "Incomplete Credentials!!",
      });

    if (!emailValidate(email))
      return res.status(400).json({
        success: false,
        message: "Invalid email format!",
      });

    if (fullName.length < 3)
      return res.status(400).json({
        success: false,
        message:
          "Full Name must be atleast 3 characters short or 50 characters long!!",
      });

    if (password.length < 3 || password.length > 13)
      return res.status(400).json({
        success: false,
        message: "Password too short or too long!!",
      });

    if (password !== confirmPassword)
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password did not match!!",
      });

    const isExisting = await User.findOne({ email });
    if (isExisting)
      return res.status(400).json({
        success: false,
        message: "Email already registered!!",
      });

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Error while hashing password!!",
      });
    }

    let pfp =
      profilePic === ""
        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQADjfoADAlJPrsl_hiiOMeE-FBor-i6hEAVg&s"
        : profilePic;

    const createdUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      profilePic: pfp,
    });

    generateJWTToken(createdUser._id, res);

    res.status(200).json({
      success: true,
      message: "User registered successfully!!",
      user: {
        _id: createdUser._id,
        fullName: createdUser.fullName,
        email: createdUser.email,
        profilePic: createdUser.profilePic,
      },
    });
  } catch (error) {
    console.error("SignUp Error:", error);
    res.status(500).json({
      success: false,
      message: "Error!! while signing up User",
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "Incomplete Credentials!!",
      });

    if (!emailValidate(email))
      return res.status(400).json({
        success: false,
        message: "Invalid email format!",
      });

    const isExisting = await User.findOne({ email }).select("+password");
    if (!isExisting)
      return res.status(400).json({
        success: false,
        message: "User not registered!!",
      });

    const isValidPassword = await bcrypt.compare(password, isExisting.password);
    if (!isValidPassword)
      return res.status(400).json({
        success: false,
        message: "Invalid credentials!!",
      });

    isExisting.password = undefined;

    generateJWTToken(isExisting._id, res);

    res.status(200).json({
      success: true,
      message: "User signed in successfully!!",
      user: {
        _id: isExisting._id,
        fullName: isExisting.fullName,
        email: isExisting.email,
        profilePic: isExisting.profilePic,
      },
    });
  } catch (error) {
    console.error("SignIn Error:", error);
    res.status(500).json({
      success: false,
      message: "Error!! while signing in User",
    });
  }
};

const signOut = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      success: true,
      message: "Sign Out Successfull!!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while signing out User!!",
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { _id } = req.user;
    const { profilePic } = req.body;

    const uploadedPfp = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { profilePic: uploadedPfp.secure_url },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully!!",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating profile",
      error: error.message,
    });
  }
};

const checkAuth = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthenticated User",
      });
    }
    res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while authenticated user",
      error: error.message,
    });
  }
};

export { signIn, signUp, signOut, updateProfile, checkAuth };
