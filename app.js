var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var compraPaguemeRouter = require('./routes/compra_pagueme');
var compraCieloRouter = require('./routes/compra_cielo');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/ecommerce-api/v1/compra-pagueme', compraPaguemeRouter);
app.use('/ecommerce-api/v1/compra-cielo', compraCieloRouter);


module.exports = app;
