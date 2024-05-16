const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
            // validate: [true, ]
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        },
        price: {
            type: Number,
            require: [true, 'please enter price']
        },
        sold: {
            type: Number,
            // validate: {
            //     validator: Number.isInteger,
            //     message: '{VALUE} is not an integer value'
            // }
        },
        producctImage: {
            type: String,
        }
    },
    { 
        timestamps: true,
        strict: false
    }
);

module.exports = mongoose.model('Product', ProductSchema);