const express = require('express')
const router = express.Router();
const Cart = require('../models/Cart')
const Order = require('../models/Order')
const OrderItem = require('../models/OrderItem')

router.post('/add', async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction()

        // save order
        const orderData = {
            customerID : req.body.customer._id,
            customerName : req.body.customer.name,
            customerEmail : req.body.customer.email,
            customerPhoneNumber : req.body.customer.phoneNumber,
            paymentMethod : req.body.orderSummary.paymentMethod,
            subTotal : req.body.orderSummary.subTotal,
            tax : req.body.orderSummary.tax,
            shippingCharges : req.body.orderSummary.shippingCharges,
            grandTotal : req.body.orderSummary.grandTotal,
        }
        const order = await Order.create(orderData)

        // save items in order items table
        const orderItemsData = req.body.cart.map(item1 => {
            const item3 = order.find(item => item.id === item1.id);
            return {
                orderID: item3._id,
                productID: item1.productID,
                productName: item1.productID.name,
                price: item1.productID.price,
                quantity: item1.quantity
            };
        });

        await OrderItem.create(orderItemsData)
        
        // delete items from cart
        await Cart.deleteMany({customerID:req.body.customer._id})

        await session.commitTransaction();
        session.endSession();
        res.status(200).send(JSON.stringify({order}))
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).send({message:error})
    }
})