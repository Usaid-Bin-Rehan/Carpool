const express = require('express');
const router = express.Router();
const path = require('path');
const custom = require('../Middleware/Middle.js')

//router.use(custom.auth)
//router.use(custom.admin)

router.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'../Templates/home/home.html'))
})

router.get('/login',(req,res) => {
    res.sendFile(path.join(__dirname,'../Templates/login/login.html'))
})

router.get('/profile',custom.auth,(req, res) => {
    res.sendFile(path.join(__dirname,'../Templates/profile/profile.html'));
})

router.get('/onetime',custom.auth,(req,res) => {
    res.sendFile(path.join(__dirname,'../Templates/onetime/onetime.html'))
})

router.get('/banned',custom.admin,(req,res) => {
    res.sendFile(path.join(__dirname,'../Templates/banned/banned.html'))
})

router.get('/history',custom.admin,(req,res) => {
    res.sendFile(path.join(__dirname,'../Templates/history/history.html'))
})

router.get('/semester',custom.auth,(req,res) => {
    res.sendFile(path.join(__dirname,'../Templates/semester/semester.html'))
})



module.exports = router;