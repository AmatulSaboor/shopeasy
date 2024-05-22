const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')

router.get('/getList/:customerID', async (req, res) => {
    try {
        console.log(req.params.customerID)
        res.send(JSON.stringify({cart : await Cart.find({customerID : req.params.customerID })}))
    } catch (error) {
        console.log(error)
    }
})

router.post('/add', async (req, res) => {
    res.send({ createdCart :  await Cart.create(req.body)})
})

router.delete('/remove/:productID', async (req, res) => {
    try {
        await Cart.deleteMany({productID : req.params.productID})
        res.status(200).send({message : 'deleted'})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router