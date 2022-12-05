const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
// const calculationData = data.calculations;
const xss = require('xss');
const validation = require('../validation');

router
    .route('/login')
    .post(async (req, res) => {
        try {
            req.body.email = validation.checkEmail(xss(req.body.email));
            req.body.password = validation.checkPassword(xss(req.body.password));
        } catch (e) {
            console.log(e)
            return res.status(400).json({error: e})
        }
        // check if the user exists
        try {
            const user = await userData.getUserByEmail(xss(req.body.email))
            if (user.empty) throw `Error: user not found`
        } catch (e) {
            console.log(e)
            return res.status(404).json({error: e})
        }
        // validate the user
        try {
            const user = await userData.checkUserByEmail(xss(req.body.email), xss(req.body.password))
            console.log(user)
            res.status(200).json(user)
        } catch (e) {
            console.log(e)
            return res.status(400).json({error: e})
        }
    })

router
    .route('/loginauth')
    .post(async (req, res) => {
        try {
            req.body.uid = validation.checkString(xss(req.body.uid))
            req.body.email = validation.checkEmail(xss(req.body.email))
            let authUser = await userData.getUserByEmail(xss(req.body.email))
            // if the user doesn't exist yet, create them
            if (authUser.empty) {
                const user = await userData.createUserByAuth(
                    xss(req.body.uid),
                    xss(req.body.displayName),
                    xss(req.body.email)
                )
                if (!user.userInserted) return res.status(500).json({error: `Internal Server Error`})
                // query them again
                authUser = await userData.getUserByEmail(xss(req.body.email))
            }
            delete authUser['password']
            console.log(authUser)
            const ret = {
                loggedIn: true,
                ...authUser
            }
            res.status(200).json(ret)
            
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