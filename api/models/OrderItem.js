const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderItemSchema = new Schema(
    {
        orderID: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        productID: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        productName: {
            type: String,
        },
        price: {
            type: Number,
        },
        quantity: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('OrderItem', OrderItemSchema)