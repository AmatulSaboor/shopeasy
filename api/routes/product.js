const express = require('express')
const router = express.Router();
const Product = require('../models/Product')
const multer = require('multer');
const fs = require('fs')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/') 
    },
    filename: function (req, file, cb) {
        // craete a unique name for each file
        cb(null, file.originalname) 
    }
});

const upload = multer({ storage: storage });



router.get('/getList', async (req, res) => {
    res.send(JSON.stringify(await Product.find()))
})

// TODO: add restriction here for only admin 
router.post('/add', upload.single('image') ,async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    if(req.file) req.body.image = req.file.filename;
    console.log(req.body.image)
    res.send(await Product.create(req.body))
})

router.delete('/delete/:id', async (req, res) => {
    // TODO: delete its image as well
    await Product.findByIdAndDelete({_id:req.params.id})
    res.send(JSON.stringify({message : 'deleted'}))  //add a check if the prodcut deleted actually
})

router.put('/update', upload.single('image'), async (req, res) => {
    console.log(req.file)
    const prod = await Product.findById(req.body._id)
    // console.log(prod.name)
    if(req.file){
        if(prod.image) fs.unlinkSync(`./public/uploads/${prod.image}`);
        req.body.image = req.file.filename;
    }else{
        req.body.image = prod.image;
    }
    console.log(req.body)
    await Product.findByIdAndUpdate(req.body._id, req.body)
    res.send(JSON.stringify({message : 'updated'}))
})

module.exports = router
