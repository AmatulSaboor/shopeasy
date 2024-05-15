const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const {isEmail} = require('validator')

const CustomerSchema = new Schema (
    {
        roleID: {
            type: Schema.Types.ObjectId,
            ref: 'Role'
        },
        firstName: {
            type: String,
            required: [true, 'please enter your first name'],
            minlength: [3, 'first name should be 3 or more characters'],        
            maxlength: [20, 'first name should be less than 20 characters'],        
        },
        lastName: {
            type: String,
            required: [true, 'please enter your last name'],
            minlength: [3, 'last name should be 3 or more characters'],        
            maxlength: [20, 'last name should be less than 20 characters'],        
        },
        email: {
            type: String,
            required: [true, 'please enter your email'],
            unique: [true, 'email already exist'],
            lowercase: true,
            // validate: [isEmail, 'please enter a valid email address'],
        },
        mobileNumber: {
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