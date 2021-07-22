const mongoose = require("mongoose");
const validator = require('validator');
const bcript = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        trim: true,
        uppercase: true,
        required: true,
        minlength : [2 , "invalid name"]
    },
    lname: {
        type: String,
        trim: true,
        uppercase: true,
        required: true,
        minlength : [2 , "invalid name"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value))
            {
                throw new Error("invalid Email")
            }
        }
    },
    number: {
        type: Number,
        required: true,
        unique: true,
        min : [10 , "invalid number"]
    },
    address: {
        type: String,
        trim: true,
        uppercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength : [4 , "invalid password"]
    },
    Cpassword: {
        type: String,
        trim: true,
        required: true,
        minlength : [4 , "invalid confirm password"]
    },
    date: {
        type: Date,
        default : Date.now
    }
    
});

UserSchema.pre("save", async function(next) {
    if (this.isModified("password"))
    {
        console.log(`non bcrypt password is ${this.password}`);
        this.password = await bcript.hash(this.password, 10);
        console.log(`bcrypt password is ${this.password}`);
        this.Cpassword = undefined;
    }
    next();
});

const UserData = new mongoose.model("UserData", UserSchema);

module.exports = UserData;