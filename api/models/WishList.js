const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WishListSchema = new Schema(
    {
        customerID:{
            type: Schema.Types.ObjectId,
            ref: 'Customer',
            require : [true, 'customer id is required']
        },
        productID:{
            type: Schema.Types.ObjectId,
            ref: 'Product',
            require : [true, 'product id is required']
        },
        // items: 
        //     [{
        //     productID: {
        //         type: Schema.Types.ObjectId, 
        //         ref: 'Product'
        //     },
        // }],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('WishList', WishListSchema)