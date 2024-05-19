const express = require('express')
const router = express.Router();
const Category = require('../models/Category')

router.get('/getList', async (req, res) => {
    res.send(JSON.stringify(await Category.find()))
})

router.post('/add', async (req, res) => {
    res.send(JSON.stringify(await Category.create(req.body)))
})

module.exports = router
