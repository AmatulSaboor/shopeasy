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

    try {
        if(req.session.customer){
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
        if(req.file){
            if(prod.image)
                fs.unlinkSync(`./public/uploads/products/${prod.image}`)
            req.body.image = req.file.filename
        }else{
            req.body.image = prod.image
        }
        updatedProduct = await Product.findByIdAndUpdate(req.body._id, req.body, {new : true})
        updatedProduct = await updatedProduct.populate('category')
        console.log('updated product : ', updatedProduct)
        if(updatedProduct)
            {
                await session.commitTransaction();
                session.endSession();
                res.status(200).send(JSON.stringify({updatedProduct}))
            }
        else {
            await session.abortTransaction();
            session.endSession();
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

