const express = require('express')
const router = express.Router();
const WishList = require('../models/WishList')

router.get('/getList/:customerID', async (req, res) => {
    try {
        res.send(JSON.stringify({wishlist : await WishList.find({customerID : req.params.customerID }).populate('productID')}))
    } catch (error) {
        res.status(500).send({'error message' : error.message})
    }
})

router.post('/add', async (req, res) => {
    try {
        let wishlistEntry = await WishList.create(req.body)
        wishlistEntry = await wishlistEntry.populate('productID')
        res.status(200).send({wishlistEntry})
    } catch (error) {
        res.status(500).send({'error message' : error.message})
    }
})

router.delete('/removeAll/:customerID', async (req, res) => {
    try {
        const result = await WishList.deleteMany({customerID : req.params.customerID})
        console.log(result.deletedCount)
        res.status(200).send({message : 'deleted'})
    } catch (error) {
        res.status(500).send({'error message' : error.message})
    }
})

router.delete('/removeOne/:productID/:customerID', async (req, res) => {
    try {
        const result = await WishList.deleteMany({productID:req.params.productID, customerID: req.params.customerID})
        if (result.deletedCount > 0)
            res.status(200).send({message : 'deleted'})
    } catch (error) {
        res.status(500).send({'error message' : error.message})
    }
})

module.exports = router
