const express = require('express')
const router = express.Router()
const { projectName } = require('../helpers')
const debug = require('debug')(`${projectName}:api`)

const fs = require('fs')
const files = fs.readdirSync(__dirname)

files.forEach(endpoint=>{
    if(endpoint!='index.js') {
        debug(endpoint);
        router.use(`/${endpoint}`, require(`./${endpoint}`))
    }
})
router.get('/', (req, res)=>{
    res.json({ message: `You're accessing dba ticketing API`})
})
router.post('/verifyRecaptcha',(req, res)=>{
    const requestify = require('requestify')
    const chalk = require('chalk')
    const url = 'https://www.google.com/recaptcha/api/siteverify'
    const secret = '6Ld8fr4UAAAAAOfNqjT679qqU9qBbegFY11GKNEO'
    const data = {
        secret,
        response: req.body.token
    }
    requestify.post(url, data, {
        dataType:'form-url-encoded'
    }).then(response=>{
        const body = response.getBody()
        res.json(body)
    })
})
module.exports = router