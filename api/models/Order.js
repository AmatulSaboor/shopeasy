const { type } = require('express/lib/response')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema(
    {
        cutomerId: {
            type: Schema.Types.ObjectId,
            ref: 'Customer'
        },
        cutomerName: {
            type: String,
        },
        totalPrice: {
            type: Number,
            require: [true, 'total price are required']
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Order', OrderSchema)