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
        try {
            req.body.username = validation.checkUsername(xss(req.body.username));
            req.body.password = validation.checkPassword(xss(req.body.password));
        } catch (e) {
            console.log(e)
            return res.status(400).json({error: e})
        }
        try {
            const userExists = await userData.getUserByUsername(xss(req.body.username))
            if (userExists.empty) throw `Error: username doesn't exist`
        } catch (e) {
            console.log(e)
            return res.status(404).json({error: e})
        }
        try {
            const user = await userData.checkUser(xss(req.body.username), xss(req.body.password))
            res.status(200).json(user)
        } catch (e) {
            console.log(e)
            return res.status(400).json({error: e})
        }
    })

router
    .route('/signup')
    .post(async (req, res) => {
        try {
            req.body.firstName = validation.checkString(xss(req.body.firstName), 'first name')
            req.body.lastName = validation.checkString(xss(req.body.lastName), 'last name')
            req.body.username = validation.checkUsername(xss(req.body.username))
            const userExists = await userData.getUserByUsername(xss(req.body.username))
            if (!userExists.empty) throw `Error: username already exists`
            req.body.password = validation.checkPassword(xss(req.body.password))
            req.body.confirmPassword = await userData.confirmPassword(xss(req.body.password), xss(req.body.confirmPassword), false);
            req.body.email = validation.checkEmail(xss(req.body.email))
            const emailExists = await userData.getUserByEmail(xss(req.body.email))
            if (!emailExists.empty) throw `Error: email already exists`
            const user = await userData.createUser(
                xss(req.body.firstName), 
                xss(req.body.lastName), 
                xss(req.body.username), 
                xss(req.body.password), 
                xss(req.body.email)
            )
            if (user.userInserted) {
                res.status(200).json(user)
            }
            else {
                return res.status(500).json({error: `Internal Server Error`})
            }
        } catch (e) {
            console.log(e)
            return res.status(400).json({error: e})
        }
    })

    module.exports = router;