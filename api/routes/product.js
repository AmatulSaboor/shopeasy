const Product = require('../models/Product')
const multer = require('multer')
const express = require('express')
const router = express.Router()
const fs = require('fs')

// ==================== set storage for images ==================== 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/products/') 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) 
    }
})
const upload = multer({ storage })

// ==================== get products ==================== 
router.get('/getList', async (req, res) => {
    try{
        const productsList = await Product.find().populate('category')
        res.status(200).send(JSON.stringify({productsList}))
    }catch(error){
        res.status(500).send(JSON.stringify({error}))
    }
})

// ==================== create product (only by admin) ==================== 
router.post('/add', upload.single('image') ,async (req, res) => {
    try{
        // console.log(`in create `, req.session.customer.role, req.session.customer.role.name)
        if(req.session.customer && req.session.customer.role.name === 'admin'){
            if(req.file) req.body.image = req.file.filename
            const createdProduct = await Product.create(req.body)
            console.log(createdProduct)
            res.status(201).send({createdProduct})
        }
        else {
            console.log('in here unauthorized')
            res.status(403).send({errorMessage : 'unauthorized request'})  // server refuses unauthorized request
        }
    }catch(error){
        res.status(500).send(JSON.stringify({error}))
    }
})

// ==================== update product ==================== 
router.put('/update', upload.single('image'), async (req, res) => {
    try {
        const prod = await Product.findById(req.body._id)
        if(req.file){
            if(prod.image)
                fs.unlinkSync(`./public/uploads/${prod.image}`)
            req.body.image = req.file.filename
        }else{
            req.body.image = prod.image
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.body._id, req.body)
        if(updatedProduct)
            res.status(200).send(JSON.stringify({updatedProduct}))
        // else res.status(404).send(JSON.stringify({})) // TODO: try giving a wrong id through postman and check
    } catch (error) {
        res.status(500).send(JSON.stringify({error}))
    }
})

// ==================== mark product as available ==================== 
router.put('/:id/available', async (req, res) => {
    try {
        const productIsAvailable = await Product.findByIdAndUpdate(req.params.id, {isAvailable : true})
        res.status(200).send(JSON.stringify({productIsAvailable}))
    } catch (error) {
        res.status(500).send(JSON.stringify({error}))
    }
})

// ==================== mark product as unavailable ==================== 
router.put('/:id/unavailable', async (req, res) => {
    try {
        const productIsUnavailable = await Product.findByIdAndUpdate(req.params.id, {isAvailable : false})
        res.status(200).send(JSON.stringify({productIsUnavailable}))
    } catch (error) {
        res.status(500).send(JSON.stringify({error}))
    }
})

module.exports = router

