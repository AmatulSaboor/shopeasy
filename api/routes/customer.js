const express = require('express')
const router = express.Router();
const Customer = require('../models/Customer')

router.get('/getAllList', async (req, res) => {
    res.send(JSON.stringify({customersList : await Customer.find()}))
})

router.post('/add', async (req, res) => {
    res.send({ createdCustomer :  await Customer.create(req.body)})
})

router.delete('/delete/:id', async (req, res) => {
    await Customer.findByIdAndDelete({_id:req.params.id})
    res.send(JSON.stringify({message : 'deleted'}))
})

// might need to remove it later
router.put('/update/:id', async (req, res) => {
    await Customer.findByIdAndUpdate({_id: req.params.id}, req.body)
    res.send(JSON.stringify({message : 'updated'}))
})

module.exports = router