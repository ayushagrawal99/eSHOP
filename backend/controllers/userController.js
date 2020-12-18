import express from "express";
import User from "../Modal/user.js";
import generatetoken from "../utils/generateToken.js";
import Bcrypt from "bcryptjs";

// @desc    Auth User and get Token
// @route   POST /api/users/login
// @access  public

const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generatetoken(user._id),
        });
    } else {
        res.status(401).json("Invalid email or password");
    }
};

// @desc    register a New User
// @route   POST /api/users
// @access  public

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(401).json("User already exists");
    }

    const EncString = Bcrypt.hashSync(password, 10);

    const user = await User.create({
        name,
        email,
        password: EncString,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generatetoken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid user data");
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401).json("Invalid email or password");
    }
};

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  Private

const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updateUser = await user.save();

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generatetoken(updateUser._id),
        });
    } else {
        res.status(401).json("User not found");
    }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin

const getUser = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin

const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json("Remove user");
    } else {
        res.status(404).json("user not found");
    }
};

// @desc    Get user by ID
// @route   DELETE /api/users/:id
// @access  Private/Admin

const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
        res.json(user);
    } else {
        res.status(404).json("user not found");
    }
};

// @desc    update user
// @route   PUT /api/users/profile
// @access  Private

const updateUser = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;

        const updateUser = await user.save();

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        });
    } else {
        res.status(401).json("User not found");
    }
};

export {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUser,
    deleteUser,
    getUserById,
    updateUser,
};
