const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        },
        phone: {
            type: String,
            required: [true, 'please enter your mobile phone'],
            unique: [true, 'mobile number already exists'],
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
            type: String,
        },
        houseNumber: {
            type: String,
        },
        street: {
            type: String,
        },
        postalCode: {
            type: Number,
        },
        city: {
            type: String,
        },
        country: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Customer', CustomerSchema)