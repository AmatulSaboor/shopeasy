const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema(
    {
        name: {
            type: String,
        },
    },
    {
        timestamps: true,
        strict: false
    }
    
)

module.exports = mongoose.model('Role', RoleSchema)