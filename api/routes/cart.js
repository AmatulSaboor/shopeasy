const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')

router.get('/getList/:customerID', async (req, res) => {
    try {
        console.log(req.params.customerID)
        res.send(JSON.stringify({cart : await Cart.find({customerID : req.params.customerID }).populate('productID')}))
    } catch (error) {
        console.log(error)
        res.status(500).send({'error message' : error.message})
    }
})

router.post('/add', async (req, res) => {
    try {
        const productIsInCart  = await Cart.find(req.body)
        console.log(productIsInCart)
        if(!productIsInCart){
        let createdCart = await Cart.create(req.body)
        createdCart = await createdCart.populate('productID')
        await WishLis
        res.send({ createdCart })}
        else{
        res.send({message: 'alreayd in cart'})
        }
    } catch (error) {
        res.status(500).send({'error message' : error.message})
    }
})

router.put('/changeItemQty', async (req, res) => {
    try {
        console.log(req.body.item)
        const id = req.body.id
        console.log(id)
        const quantity = req.body.quantity
        const result = await Cart.findByIdAndUpdate(
            id,
            {quantity},
            {new: true}
        )
            res.status(200).send({message : result})
    } catch (error) {
        console.log(error)
        res.status(500).send({'error message' : error.message})
    }
}) 

router.delete('/removeAll/:customerID', async (req, res) => {
    try {
        // const {productID, customerID} = req.params
        const result = await Cart.deleteMany({customerID : req.params.customerID})
        console.log(result.deletedCount)
        res.status(200).send({message : 'deleted'})
    } catch (error) {
        console.log(error)
        res.status(500).send({'error message' : error.message})
    }
})

router.delete('/removeOne/:productID/:customerID', async (req, res) => {
    try {
        const result = await Cart.deleteMany({productID:req.params.productID, customerID: req.params.customerID})
        console.log(result.deletedCount)
        if(result.deletedCount > 0)
            res.status(200).send({message : 'deleted'})
    } catch (error) {
        console.log(error)
        res.status(500).send({'error message' : error.message})
    }
})

module.exports = router