const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WishListSchema = new Schema(
    {
        items: 
            [{
            productId: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number,
            price: Number,
        }],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('WishList', WishListSchema)