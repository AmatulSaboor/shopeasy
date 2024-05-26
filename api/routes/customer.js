const express = require('express')
const router = express.Router();
const Customer = require('../models/Customer')

router.get('/getById/:id', async (req, res) => {
    try {
        res.send(JSON.stringify({customer : await Customer.findById(req.params.id)}))
    } catch (error) {
        console.log(error)        
    }
})

router.get('/getAllList', async (req, res) => {
    res.send(JSON.stringify({customersList : await Customer.find()}))
})

router.put('/update/:id', async (req, res) => {
    console.log(req.body)
    // res.send({ updatedCustomer :  await Customer.findByIdAndUpdate(req.body)})
    res.send({ updatedCustomer :  `abhi ho rahay hay update`})
})

module.exports = router