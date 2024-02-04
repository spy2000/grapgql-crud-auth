const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const validator = require("validator");
const jwt = require("jsonwebtoken");



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide valid email id"],
    },
    mobile: {
        type: Number,
        unique: true,
        // required: [true, "Please provide mobile number"],
    },
    age: {
        type: Number,
        required: [true, "Please provide your age"],
    },
    password: {
        type: String,
        minlength: [8, "Password must contain 8 letter character"],
        // select: false,
    },
    is_deleted: {
        type: Boolean,
        default: false
    },


});

userSchema.pre("save", async function (next) {
    if (this.password !== undefined) {
        if (!this.isModified("password")) {
            return next();
        } else {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
});

userSchema.methods.comparePassword = async function (enterPassword) {
    const pass = await bcrypt.compare(enterPassword.toString(), this.password);
    return pass;
};

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
