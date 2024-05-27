const express = require('express')
const router = express.Router();
const Category = require('../models/Category')

router.get('/getList', async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).send(JSON.stringify({categories}))
    } catch (error) {
        res.status(500).send({'error message' : error.message})
    }
})

router.post('/add', async (req, res) => {
    try {
        const newCategory =  await Category.create(req.body)
        res.status(200).send(JSON.stringify({newCategory}))
    }catch(error){
        res.status(500).send({'error message' : error.message})
    }

})

module.exports = router
