const express = require('express');
const router = express.Router();
const middleware = require('../config/midleware.js');
const service = require("../service/service");
const path = require('path');
const fs = require('fs');

const multer = require('multer')


router.get('/', async (req, res) => {
    const langDefault = await service.getLangDefault() || "vi";
    const lang = req.query.lang || langDefault; 
    req.setLocale(lang);
    res.render('index');
})

router.get('/product_liquid', async (req, res) => {
    const langDefault = await service.getLangDefault() || "vi"
    const lang = req.query.lang || langDefault; 
    req.setLocale(lang);
    res.render('product_liquid')
})

router.get('/product_glass', async (req, res) => {
    const langDefault = await service.getLangDefault() || "vi"
    const lang = req.query.lang || langDefault; 
    req.setLocale(lang);
    res.render('product_glass')
})

router.get('/product_powder', async (req, res) => {
    const langDefault = await service.getLangDefault() || "vi"
    const lang = req.query.lang || langDefault; 
    req.setLocale(lang);
    res.render('product_powder')
})

router.get('/about', async(req, res) => {
    const langDefault = await service.getLangDefault() || "vi"
    const lang = req.query.lang || langDefault; 
    req.setLocale(lang);
    res.render('about',)
})

router.get('/contact', async (req, res) => {
    const langDefault = await service.getLangDefault() || "vi"
    const lang = req.query.lang || langDefault; 
    req.setLocale(lang);
    res.render('contact')
})


router.get('/industries', async (req, res) => {
    const langDefault = await service.getLangDefault() || "vi"
    const lang = req.query.lang || langDefault; 
    req.setLocale(lang);
    res.render('industries')
})

router.get('/item-industries', async (req, res) => {
    const langDefault = await service.getLangDefault() || "vi"
    const lang = req.query.lang || langDefault; 
    req.setLocale(lang);
    res.render('item-industries')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/dashboard', middleware, (req, res) => {
    res.render('dashboard')
})

module.exports = router