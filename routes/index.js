const express = require('express')
const router = express.Router()


const listService = require('../services/list')
const authService = require('../services/auth')
const meService = require('../services/me')

router.get('/', listService.list)
router.get('/auth', authService.main)
router.get('/me', meService.main)


module.exports = router
