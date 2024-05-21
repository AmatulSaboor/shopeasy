const express = require('express')
const router = express.Router();
const WishList = require('../models/WishList')

router.get('/getList/:customerID', async (req, res) => {
    try {
        console.log(req.params.customerID)
        res.send(JSON.stringify({wishList : await WishList.find({customerID : req.params.customerID })}))
    } catch (error) {
        console.log(error)
    }
})

router.post('/add', async (req, res) => {
    try {
        const wishlistEntry = await WishList.create(req.body)
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

module.exports = router
