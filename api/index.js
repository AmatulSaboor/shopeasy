const app = require('express')()
const port = process.env.PORT || 9000;
const cors = require('cors')
const uri = 'mongodb+srv://Admin:Password123@cluster0.vzs9g.mongodb.net/';
const mongoose = require('mongoose');
const paymentRouter = require('./routes/payment')
const customerRouter = require('./routes/customer')
const orderRouter = require('./routes/order')
const wishlistRouter = require('./routes/wishlist')
const cartRouter = require('./routes/cart');
const express = require('express');

// connection to DB
mongoose.connect(uri).then((result)=>{
    console.log('connected to Mongo DB Atlas');
  }).catch((error)=>{
    console.error('error connecting to Mongo DB Atlas', error);
});

// middleswares
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/product', productRouter)
app.use('/customer', customerRouter)
app.use('/cart', cartRouter)
app.use('/wishlist', wishlistRouter)
app.use('/payment', paymentRouter)


// app.get('/getProductsList', async (req,res) => {
// res.send(
//     JSON.stringify({productsList : await Products.find({})})
// )})

app.listen(port, () => {
    console.log(`server is listening at ${port}`)
})