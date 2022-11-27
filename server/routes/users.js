const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const calculationData = data.calculations;
const xss = require('xss');
const validation = require('../validation');

router
    .route('/login')
    .post(async (req, res) => {

    })

router
    .route('/signup')
    .post(async (req, res) => {

    })