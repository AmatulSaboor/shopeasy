const express = require('express')
const router = express.Router();
const WishList = require('../models/WishList')

router.get('/getAllList', async (req, res) => {
    res.send(JSON.stringify({wishesList : await WishList.find()}))
})

router.post('/add', async (req, res) => {
    res.send({ createdWish :  await WishList.create(req.body)})
})

router.delete('/delete/:id', async (req, res) => {
    await WishList.findByIdAndDelete({_id:req.params.id})
    res.send(JSON.stringify({message : 'deleted'}))
})

router.put('/update/:id', async (req, res) => {
    await WishList.findByIdAndUpdate({_id: req.params.id}, req.body)
    res.send(JSON.stringify({message : 'updated'}))
})

module.exports = router
