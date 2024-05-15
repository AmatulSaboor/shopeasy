const express = require('express')
const router = express.Router();
const Product = require('../models/Product')

router.get('/getList', async (req, res) => {
    res.send(JSON.stringify(await Product.find()))
})

// TODO: add restriction here for only admin 
router.post('/add', async (req, res) => {
    res.send({ createdProduct :  await Product.create(req.body)})
})

router.delete('/delete/:id', async (req, res) => {
    await Product.findByIdAndDelete({_id:req.params.id})
    res.send(JSON.stringify({message : 'deleted'}))  //add a check if the prodcut deleted actually
})

router.put('/update', async (req, res) => {
    await Product.findByIdAndUpdate(req.body._id, req.body)
    res.send(JSON.stringify({message : 'updated'}))
})

module.exports = router
