const express = require('express');
const path = require('path');
const i18n = require('i18n');
var app = express();
const router = require("./src/routes/index")
const routeruser = require("./src/routes/user")
const admin = require('./src/model/connect');
const fs = require('fs');
require('dotenv').config();

const db = admin.database();

app.use(express.json());
app.use('/public', express.static('public'))
app.use('/forms', express.static('forms'))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
i18n.configure({
    locales: ['vi','en', 'zh'], 
    directory: path.join(__dirname, 'locales'),  
    defaultLocale: 'vi', 
    queryParameter: 'lang', 
    autoReload: true,
    syncFiles: true,
    cookie: 'lang'  
});

app.use(i18n.init);
app.use((req, res, next) => {
    res.locals.__ = res.__;  
    next();
});

app.use('/', router);
app.use('/api', routeruser);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server đang lắng nghe tại http://localhost:${port}`);
});