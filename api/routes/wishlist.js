const express = require('express')
const router = express.Router();
const WishList = require('../models/WishList')

router.get('/getList/:customerID', async (req, res) => {
    try {
        console.log(req.params.customerID)
        res.send(JSON.stringify({wishList : await WishList.find({customerID : req.params.customerID }).populate('productID')}))
    } catch (error) {
        console.log(error)
        res.status(500).send({'error message' : error.message})
    }
})

router.post('/add', async (req, res) => {
    try {
        let wishlistEntry = await WishList.create(req.body)
        wishlistEntry = await wishlistEntry.populate('productID')
        res.status(200).send({wishlistEntry})
    } catch (error) {
        console.log(error)
    }
    // try {
    //     console.log(req.body)
    //     const wishlist = await WishList.findOne({ customerID: req.body.customerID });
    //     let updatedWishlist = [];
    //     if (!wishlist) {
    //         updatedWishlist = await WishList.create({
    //             customerID: req.body.customerID,
    //             items: [{ productID: req.body.productID }]
    //         });    
    //     }
    //     else{
    //         updatedWishlist = await WishList.findOneAndUpdate(
    //             { _id: wishlist._id },
    //             { $push: {items: { productID: req.body.productID }}, $set: {} },{ new : true });
    //     }
    //     res.status(201).send({updatedWishlist})
    // } catch (error) {
    //     console.log(error)
    // }
})

router.delete('/removeAll/:customerID', async (req, res) => {
    try {
        // const {productID, customerID} = req.params
        const result = await WishList.deleteMany({customerID : req.params.customerID})
        console.log(result.deletedCount)
        res.status(200).send({message : 'deleted'})
    } catch (error) {
        console.log(error)
    }
})

router.delete('/removeOne/:productID/:customerID', async (req, res) => {
    try {
        const result = await WishList.deleteMany({productID:req.params.productID, customerID: req.params.customerID})
        if (result.deletedCount > 0)
            res.status(200).send({message : 'deleted'})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
