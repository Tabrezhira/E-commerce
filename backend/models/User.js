const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [ /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address" ],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role:{
        type:String,
        enum:["customer","admin"],
        default:"customer"
    }
},{timestamps:true});

// Password Hash middleware

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;