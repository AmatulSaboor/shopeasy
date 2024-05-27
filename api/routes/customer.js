const express = require('express')
const router = express.Router();
const Customer = require('../models/Customer')

router.get('/getById/:id', async (req, res) => {
    try {
        res.send(JSON.stringify({customer : await Customer.findById(req.params.id)}))
    } catch (error) {
        res.status(500).send({'error message' : error.message})        
    }
})


module.exports = router