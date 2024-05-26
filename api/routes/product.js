const Product = require('../models/Product')
const multer = require('multer')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const mongoose = require('mongoose');

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
    try {
        const productsList = await Product.find().populate('category')
        res.status(200).send(JSON.stringify({productsList}))
    } catch(error){
        res.status(500).send(JSON.stringify({error}))
    }
})

// ==================== create product (only by admin) ==================== 
router.post('/add', upload.single('image') ,async (req, res) => {
    // console.log(`role object`, req.session.customer.role)
    // console.log(`role name`, req.session.customer.populate('role').name)
    try {
        if(req.session.customer){
        // if(req.session.customer && req.session.customer.role === '664ada4ddde187ee1c525220'){
            if(req.file) req.body.image = req.file.filename
            const createdProduct = await Product.create(req.body)
            console.log(createdProduct)
            await createdProduct.populate('category')
            console.log(createdProduct)
            res.status(201).send({createdProduct})
        }
        else {
            res.status(403).send({error : 'unauthorized request'})  // 403 : server refuses unauthorized request
        }
    } catch(error){
        console.log(error)
        res.status(500).send(JSON.stringify({error}))
    }
})

// ==================== update product ==================== 
router.put('/update', upload.single('image'), async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction()
        const prod = await Product.findById(req.body._id)
        console.log(`prod`, prod)
        if(req.file){
            if(prod.image)
                fs.unlinkSync(`./public/uploads/products/${prod.image}`)
            console.log(`prod image `, prod?.image)
            req.body.image = req.file.filename
            console.log('after image deletion')
        }else{
            req.body.image = prod.image
            console.log('after image same')
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.body._id, req.body, {new : true})
        console.log('in update product', updatedProduct)
        if(updatedProduct)
            {
                await session.commitTransaction();
                session.endSession();
                res.status(200).send(JSON.stringify({updatedProduct}))
            }
        else {
            await session.abortTransaction();
            session.endSession();
            // else res.status(404).send(JSON.stringify({})) // TODO: try giving a wrong id through postman and check
        }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
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

