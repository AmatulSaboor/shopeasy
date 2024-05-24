const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema(
    {
        customerID: {
            type: Schema.Types.ObjectId,
            ref: 'Customer'
        },
        customerName: {
            type: String,
        },
        customerEmail: {
            type: String,
        },
        customerPhoneNumber: {
            type: String,
        },
        customerAddressLine1: {
            type: String,
        },
        customerAddressLine2: {
            type: String,
        },
        paymentMethod: {
            type: String,
        },
        subTotal: {
            type: Number,
            require: [true, 'sub total is required']
        },
        tax: {
            type: Number,
        },
        shippingCharges: {
            type: Number,
        },
        grandTotal: {
            type: Number,
            require: [true, 'grand total are required']
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Order', OrderSchema)