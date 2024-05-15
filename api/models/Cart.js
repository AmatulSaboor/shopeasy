const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema(
    {
        customerID: {
            type: Schema.Types.ObjectId,
            ref: 'Customer'
        },
        productID: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            // validate : {
            //     validator: Number.isInteger,
            //     message: '{VALUE} is not an integer value'
            // }
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Cart', CartSchema)