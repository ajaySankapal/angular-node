const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide the product title'],
        unique: true
    },
    photo: {
        type: Object,
        required: [true, 'Please provide photo'],
    },
    tags: {
        type: [String],
        required: [true, 'Please provide tags'],
    },


    attributes: {
        type: [Object],
        required: [true, 'Please provide attributes']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    price: {
        type: Number,
        required: [true, 'Please provide the price'],
    }
})

module.exports = mongoose.model('Product', ProductSchema)
