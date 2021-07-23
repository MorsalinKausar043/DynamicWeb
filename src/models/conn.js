const mongoose = require("mongoose");
const validator = require('validator');
const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    tokens: [{
        token: {
            type: String,
            required : true
        }
    }],
    date: {
        type: Date,
        default : Date.now
    }
    
});

UserSchema.methods.ganerateAuthtoken = async function () {
    try
    {
        const token = await jwt.sign({_id : this._id.toString()}, "morsalinkausarisawebdevoloperheliveinjamalpur");
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
        
    } catch (error) {
        res.status(404).render('Error', { para: error });
    }
}

UserSchema.pre("save", async function(next) {
    if (this.isModified("password"))
    {
        this.password = await bcript.hash(this.password, 10);
        this.Cpassword = await bcript.hash(this.password, 10);
    }
    next();
});

const UserData = new mongoose.model("UserData", UserSchema);

module.exports = UserData;