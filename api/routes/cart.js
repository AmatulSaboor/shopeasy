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
    let createdCart = await Cart.create(req.body)
    createdCart = await createdCart.populate('productID')
    res.send({ createdCart })
})

router.delete('/removeAll/:customerID', async (req, res) => {
    try {
        // const {productID, customerID} = req.params
        const result = await Cart.deleteMany({customerID : req.params.customerID})
        console.log(result.deletedCount)
        res.status(200).send({message : 'deleted'})
    } catch (error) {
        console.log(error)
    }
})

router.delete('/removeOne/:productID', async (req, res) => {
    try {
        const result = await Cart.deleteMany({productID:req.params.productID})
        console.log(result.deletedCount)
        if(result.deletedCount > 0)
            res.status(200).send({message : 'deleted'})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router