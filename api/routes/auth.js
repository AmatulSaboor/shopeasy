const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const bcrypt = require('bcryptjs');

// =============================================== checks authentication ====================================
router.get('/session', (req, res) => {
    console.log(`i am inside session`)
    if (req.session.isAuthenticated)
        res.send(JSON.stringify({
            isAuthenticated: true, error: null, 
            id: req.session.customer.id,
            name: req.session.customer.name, 
            email: req.session.customer.email, 
            role: req.session.customer.role,
            image: req.session.customer.image }
        ));
    else
        res.send(JSON.stringify({isAuthenticated: false, error: 'Some Error Occured, Try Again!!!'}));
})

// ================================================== login post ======================================================
router.post('/login', async (req, res) => {
    console.log('I am inside login....');
    console.log(req.session);
    try {
        // const result = await Customer.findOne({ name: req.body.email }).populate('role')
        const result = await Customer.findOne({ email: req.body.email })
        console.log(`in result : `, result);
        if (result) {
            const isValidPassword = await bcrypt.compare(req.body.password, result.password);
            if (isValidPassword) {
                req.session.isAuthenticated = true;
                req.body.id = result._id;
                req.body.name = result.name;
                req.body.role = result.role;
                req.body.image = result.image;
                req.session.customer = req.body;
                res.send(JSON.stringify({ message: 'Welcome ' + req.body.name, id: result._id, name: req.body.name, email: result.email, email: result.role, email: result.image }));
            } else {
                res.send(JSON.stringify({ error: 'Incorrect Password' }));
            }
        } else {
            res.send(JSON.stringify({ error: "Customer doesn't exist" }));
        }
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

// ================================================= register ===================================================
router.post('/register', async (req, res) => {
    const regex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;
    console.log(req.body);
    console.log('inside register post')
    let newCustomer = await Customer.findOne({email: req.body.email});
    if (newCustomer){
      return res.send(JSON.stringify({error: 'You already have this email address, sign in now!', name: newCustomer.name}));
    }
    newCustomer = await Customer.findOne({name: req.body.name});
    if (newCustomer){
      return res.send(JSON.stringify({error: 'This name already exist, sign in now!', customer: newCustomer.name}));
    }
    try{
        console.log(regex.test(req.body.password));
        if (regex.test(req.body.password)){
            req.body.password = await bcrypt.hash(req.body.password, 10);
            req.body.confirmPassword = await bcrypt.hash(req.body.confirmPassword, 10);
            req.body.role = '664ada57dde187ee1c525222'
            newCustomer = await Customer.create(req.body);
            req.session.isAuthenticated = true;
            req.session.customer = req.body;
            console.log(`in register ` , req.session.customer)
            res.send(JSON.stringify({message: req.body.name + ' is successfully registered', id: newCustomer._id, name: newCustomer.name, email:newCustomer.email, role:newCustomer.role}));
        }
        else{
            console.log(`invalid password`)
            throw new Error(`password must not contain white-spaces,
                            have at least one uppercase character,
                            contain at least one digit,
                            contain at least one special symbol,
                            must be 10-16 characters long`);
        }
    }catch(e){
      if (e.message.indexOf('validation failed') !== -1) {
        e = Object.values(e.errors)[0].message
      }
      else{
          console.log(`inside else for invalid password`)
          e = e.message;
      }
      return res.status(500).send(JSON.stringify({error: e}));
    }
});

// ================================================== logout ======================================================
router.get('/logout', (req, res) =>
{
  req.session.destroy(err =>
    {
      if (err) throw err;
      res.clearCookie('connect.sid');
      res.send(JSON.stringify({logout: true}));
    });
});

module.exports = router;