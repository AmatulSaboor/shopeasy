const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')

router.get('/getList/:customerID', async (req, res) => {
    try {
        console.log(req.params.customerID)
        res.send(JSON.stringify({cart : await Cart.find({customerID : req.params.customerID }).populate('productID')}))
    } catch (error) {
        console.log(error)
    }
})

router.post('/add', async (req, res) => {
    res.send({ createdCart :  await Cart.create(req.body)})
})

router.delete('/removeByData/:productID/:customerID', async (req, res) => {
    try {
        const {productID, customerID} = req.params
        const result = await Cart.deleteMany({productID, customerID})
        console.log(result.deletedCount)
        res.status(200).send({message : 'deleted'})
    } catch (error) {
        console.log(error)
    }
})

router.delete('/removeById/:id', async (req, res) => {
    try {
        const result = await Cart.findByIdAndDelete(req.params.id)
        console.log(result.deletedCount)
        res.status(200).send({message : 'deleted'})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router