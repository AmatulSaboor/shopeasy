const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'category name is required'],
            unique : [true, 'category name must be unique']
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Category', CategorySchema)