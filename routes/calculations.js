const express = require('express');
const router = express.Router();
const data = require('../data');
const calculationData = data.calculations;
const xss = require('xss');
const validation = require('../validation');
const userData = data.users;

router
    .route('/addtransaction')
    .post(async (req, res) => {
        if (!req.session.user) {
            return res.status(400).json({error: 'User not logged in!'})
        }
        if (req.body.id) {
            try {
                req.body.id = validation.checkId(xss(req.body.id));
                req.body.name = validation.checkName(xss(req.body.name));
                req.body.amount = validation.checkNum(xss(req.body.amount));
                req.body.date = validation.checkString(xss(req.body.date));
                req.body.category = validation.checkString(xss(req.body.category));
                req.body.payment = validation.checkString(xss(req.body.payment));
                
                let userReturn = await calculationData.addTransaction(req.session.user.id, xss(req.body.id), xss(req.body.name), xss(req.body.amount), xss(req.body.date), xss(req.body.category), xss(req.body.payment));
                req.session.user = userReturn;

                return res.status(200).json({success: "success"});
            } catch (e) {
                console.log(e)
                return res.status(400).json({error: "error"});
            }
        }
    })

router
    .route('/addcategory')
    .post(async (req, res) => {
        if (!req.session.user) {
            return res.status(400).json({error: 'User not logged in!'})
        }
        if (req.body.id) {
            try {
                req.body.id = validation.checkId(xss(req.body.id));
                req.body.name = validation.checkName(xss(req.body.name));
                req.body.amount = validation.checkNum(xss(req.body.amount));
                req.body.isExpense = validation.checkBool(xss(req.body.isExpense));

                let user = await userData.getUser(req.session.user.id);
                let categories = user.categories;

                // let categories = await calculationData.getAllCategories(req.session.user.id);
                // categories = categories.categories;
        
                if (req.body.isExpense){
                    if (categories.expenses.some(e => e.name.toLowerCase().trim() === req.body.name.toLowerCase().trim())) throw 'already used';
                } else {
                    if (categories.spending.some(e => e.name.toLowerCase().trim() === req.body.name.toLowerCase().trim())) throw 'already used';
                } 

                let userReturn = await calculationData.addCategory(req.session.user.id, xss(req.body.id), xss(req.body.name), xss(req.body.amount), xss(req.body.isExpense));
                req.session.user = userReturn;

                return res.status(200).json({success: "success"});
            } catch (e) {
                console.log(e)
                return res.status(400).json({error: "error"});
            }
        }
    })

router
    .route('/deletecategory')
    .post(async (req, res) => {
        if (!req.session.user) {
            return res.status(400).json({error: 'User not logged in!'})
        }
        if (req.body.id) {
            try {
                req.body.id = validation.checkId(xss(req.body.id));
                req.body.amount = validation.checkNum(xss(req.body.amount));
                req.body.isExpense = validation.checkBool(xss(req.body.isExpense));
                let userReturn = await calculationData.deleteCategory(req.session.user.id, xss(req.body.id), xss(req.body.amount), xss(req.body.isExpense));
                req.session.user = userReturn;

                return res.status(200).json({success: "success"});
            } catch (e) {
                console.log(e)
                return res.status(400).json({error: "error"});
            }
        }
    })

router
    .route('/deletetransaction')
    .post(async (req, res) => {
        if (!req.session.user) {
            return res.status(400).json({error: 'User not logged in!'})
        }

        if (req.body.id) {
            try {
                req.body.id = validation.checkId(xss(req.body.id));

                console.log(req.body.amount);
                req.body.amount = validation.checkNum(xss(req.body.amount));
                req.body.category = validation.checkString(xss(req.body.category));
                req.body.payment = validation.checkString(xss(req.body.payment));
                let userReturn = await calculationData.deleteTransaction(req.session.user.id, xss(req.body.id), xss(req.body.amount), xss(req.body.category), xss(req.body.payment));
                req.session.user = userReturn;
                
                return res.status(200).json({success: "success"});
            } catch (e) {
                console.log(e)
                return res.status(400).json({error: "error"});
            }
        }
    })

router
    .route('/getAllTransactions')
    .get(async (req, res) => {
        if (!req.session.user) {
            return res.status(400).json({error: 'User not logged in!'})
        }

        if (req.session.user.id) {
            try {
                const userReturn = await calculationData.getAllTransactions(req.session.user.id)
                req.session.user = userReturn.user;
                return res.status(200).json({success: "success", transactions: userReturn.transactions});
            } catch (e) {
                console.log(e)
                return res.status(400).json({error: "error"});
            }
        }
    })

router
    .route('/getAllCategories')
    .get(async (req, res) => {
        if (!req.session.user) {
            return res.status(400).json({error: 'User not logged in!'})
        }

        if (req.session.user.id) {
            try {
                const userReturn = await calculationData.getAllCategories(req.session.user.id);
                req.session.user = userReturn.user;
                return res.status(200).json({success: "success", categories: userReturn.categories});
            } catch (e) {
                console.log(e)
                return res.status(400).json({error: "error"});
            }
        }
    })

router
    .route('/getUserBudget')
    .get(async (req, res) => {
        if (!req.session.user) {
            return res.status(400).json({error: 'User not logged in!'})
        }

        if (req.session.user.id) {
            try {
                const budget = await calculationData.getBudget(req.session.user.id)
                return res.status(200).json({success: "success", budget: budget})
            } catch (e) {
                console.log(e)
                return res.status(400).json({error: "error"});
            }
        }
    })

module.exports = router;