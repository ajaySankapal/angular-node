const getDataUri = require('../config/dataUri')
const Product = require('../model/Product')
const cloudinary = require('cloudinary')

exports.createProduct = async (req, res) => {
    try {
        const { title, tags, attributes, price } = req.body
        if (!title || !tags || !attributes || !price) {
            return res.status(400).json({ success: false, message: 'All the fields are required!' })
        }
        let product = await Product.findOne({ title })
        if (product) {
            return res.status(400).json({ success: false, message: 'Product already exist.' })
        }

        const photo = req.file
        if (!photo) {
            return res.status(400).json({ success: false, message: 'All the fields are required!' })
        }
        const fileUri = getDataUri(photo)

        const myCloud = await cloudinary.v2.uploader.upload(fileUri.content)

        product = await Product.create({
            title,
            tags,
            attributes,
            price,
            // photo: photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9eFwlS6Z746U21Irrzy1-feYRUn12Jw4XRg&usqp=CAU"
            photo: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        })
        res.status(201).json({ success: true, product })
        req.io.emit('message', 'Product Added!')
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

exports.getProducts = async (req, res) => {
    try {
        let products = await Product.find({})
        res.status(200).json({ success: true, products })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { title, tags, attributes, price } = req.body
        if (!title || !tags || !attributes || !price) {
            res.status(400).json({ success: false, message: "All the fields are required" })
        }
        let product = await Product.findById(req.params.id)
        const photo = req.file
        console.log(photo, "photo")
        const fileUri = getDataUri(photo)

        const myCloud = await cloudinary.v2.uploader.upload(fileUri.content)
        if (product) {
            product.title = title
            product.photo = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
            product.tags = tags
            product.attributes = attributes
            product.price = price
            let updatedProduct = await product.save()
            req.io.emit('message', 'Product Updated!')
            return res.status(200).json({ success: false, updatedProduct })

        } else {
            res.status(404).json({ success: false, message: 'Product not found.' })

        }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            await Product.deleteOne({ _id: req.params.id })
            res.json({ success: true, message: 'product removed' })
            req.io.emit('message', 'Product Deleted!')
        } else {
            res.status(404).json({ success: false, message: 'Product not found.' })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.status(200).json({ success: true, product })
        } else {
            res.status(404).json({ success: false, message: 'Product not found' })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}