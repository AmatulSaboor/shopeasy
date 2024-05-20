const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required : [true, 'please enter name']
        },
        description: {
            type: String,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required : [true, 'please select category']

        },
        price: {
            type: Number,
            required: [true, 'please enter price']
        },
        quantity: {
            type: Number,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            },
            required: [true, 'please enter qunatity']
        },
        sold: {
            type: Number,
            default : 0,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            }
        },
        image: {
            type: String,
        },
        isAvailable: {
            type: Boolean,
            default : true
        }
    },
    { 
        timestamps: true,
        strict: false
    }
)

module.exports = mongoose.model('Product', ProductSchema)