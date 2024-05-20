const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const {isEmail} = require('validator')

const CustomerSchema = new Schema (
    {
        role: {
            type: Schema.Types.ObjectId,
            ref: 'Role'
        },
        name: {
            type: String,
            required: [true, 'please enter your name'],
            unique: [true, 'name already exist'],
            minlength: [3, 'name should be 3 or more characters'],        
            maxlength: [20, 'name should be less than 20 characters'],        
        },
        email: {
            type: String,
            required: [true, 'please enter your email'],
            unique: [true, 'email already exist'],
            lowercase: true,
            // validate: [isEmail, 'please enter a valid email address'],
        },
        phone: {
            type: String,
            required: [true, 'please enter your mobile phone'],
            unique: [true, 'mobile number already exists'],
            minlength: [11, 'mobile number should be of 11 digits'],
            maxlength: [11, 'mobile number should be of 11 digits'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be 6 or more characters'],
        },
        confirmPassword: {
            type: String,
            required: [true, 'Confirm password is required'],
        },
        gender: {
            type: Boolean,
        },
        dob: {
            type: Date,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        country: {
            type: String,
        },
        // profileImage: {
        //     type: Image,
        // }
    },
    {
        timestamps: true,
        // strict: false
    }
)

module.exports = mongoose.model('Customer', CustomerSchema)