const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')

router.get('/getAllList', async (req, res) => {
    res.send(JSON.stringify({cartsList : await Cart.find()}))
})

router.get('/getList', async (req, res) => {
    res.send(JSON.stringify({cartsList : await Cart.find({customerID: req.session.user.ID})}))  //TODO: check this ID
})

router.post('/add', async (req, res) => {
    res.send({ createdCart :  await Cart.create(req.body)})
})

router.delete('/delete/:id', async (req, res) => {
    await Cart.findByIdAndDelete({_id:req.params.id})
    res.send(JSON.stringify({message : 'deleted'}))  
})

router.put('/update/:id', async (req, res) => {
    await Cart.findByIdAndUpdate({_id: req.params.id}, req.body)
    res.send(JSON.stringify({message : 'updated'}))
})

module.exports = router