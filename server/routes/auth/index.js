const express = require('express')
const router = express.Router()
const { projectName, JWT_SECRET } = require('../../configs/env.conf')
const debug = require('debug')(`${projectName}:auth`)
const moment = require('moment')
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.get('/login', passport.authenticate('basic', { failureRedirect:'/login' }), (req, res, next)=>{
    let user = req.user
    user.exp = moment().add(12,'h');
    // console.log('LOGIN',req.user)
    const token = jwt.sign(user.toJSON(), JWT_SECRET,  { expiresIn: '12h'})
    res.json({user, token});
})
router.get('/logout', (req, res, next)=>{
    Promise.all([req.session.destroy(), req.logout(), res.clearCookie('connect.sid')])
    .then(()=>{
        // debug('LOGOUT',req.user)
        res.json({message: 'logged out!'})
    }, err=>next(err))
})
module.exports = router