require('dotenv').config();
const path = require('path');
const app = require('express')()
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session)
const port = process.env.PORT || 9000;
const cors = require('cors')
const sessionSecret = process.env.SESSION_SECRET;
const corsOrigin = process.env.CORS_ORIGIN;
const uri = process.env.MONGO_URI;
const mongoose = require('mongoose');
const productRouter = require('./routes/product')
const categoryRouter = require('./routes/category')
const customerRouter = require('./routes/customer')
const orderRouter = require('./routes/order')
const wishlistRouter = require('./routes/wishlist')
const cartRouter = require('./routes/cart');
const authRouter = require('./routes/auth');
const emailRouter = require('./routes/email');
const express = require('express');

// connection to DB
mongoose.connect(uri).then((result)=>{
    console.log('connected to Mongo DB Atlas');
  }).catch((error)=>{
    console.error('error connecting to Mongo DB Atlas', error);
});

// creating session
const store = new MongoDBStore({
  uri: uri,
  collection: 'mySessions',
  autoRemove: 'interval',
  autoRemoveInterval: 1
});
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: store,
  }
));

// middleswares
app.use(cors({
  origin: corsOrigin,
  credentials: true
}));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
app.use('/product', productRouter)
app.use('/customer', customerRouter)
app.use('/cart', cartRouter)
app.use('/wishlist', wishlistRouter)
app.use('/category', categoryRouter)
app.use('/auth', authRouter)
app.use('/order', orderRouter)
app.use('/email', emailRouter)

app.listen(port, () => {
    console.log(`server is listening at ${port}`)
})