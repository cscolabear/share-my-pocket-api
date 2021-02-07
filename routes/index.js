const express = require('express')
const router = express.Router()

const listService = require('../services/list')

router.get('/', listService.list)
router.get('/me', (req, res) => {
    return res.status(200).json({ name: "cola" })
})

module.exports = router