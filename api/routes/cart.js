const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')

router.get('/getList/:customerID', async (req, res) => {
    try {
        res.send(JSON.stringify({cart : await Cart.find({customerID : req.params.customerID }).populate('productID')}))
    } catch (error) {
        console.log(error)
        res.status(500).send({'error message' : error.message})
    }
})

router.post('/add', async (req, res) => {
    try {
        const productIsInCart  = await Cart.find(req.body)
        console.log(productIsInCart.length)
        if(productIsInCart.length === 0){
            let createdCart = await Cart.create(req.body)
            createdCart = await createdCart.populate('productID')
            res.status(200).send({ createdCart })
        }
        else{
            res.send({message: 'alreayd in cart'})
        }
    } catch (error) {
        res.status(500).send({'error message' : error.message})
    }
})

router.put('/changeItemQty', async (req, res) => {
    try {
        const id = req.body.id
        const quantity = req.body.quantity
        const result = await Cart.findByIdAndUpdate(
            id,
            {quantity},
            {new: true}
        )
            res.status(200).send({message : result})
    } catch (error) {
        res.status(500).send({'error message' : error.message})
    }
}) 

router.delete('/removeAll/:customerID', async (req, res) => {
    try {
        const result = await Cart.deleteMany({customerID : req.params.customerID})
        res.status(200).send({message : 'deleted'})
    } catch (error) {
        res.status(500).send({'error message' : error.message})
    }
})

router.delete('/removeOne/:productID/:customerID', async (req, res) => {
    try {
        const result = await Cart.deleteMany({productID:req.params.productID, customerID: req.params.customerID})
        if(result.deletedCount > 0)
            res.status(200).send({message : 'deleted'})
    } catch (error) {
        res.status(500).send({'error message' : error.message})
    }
})

module.exports = router