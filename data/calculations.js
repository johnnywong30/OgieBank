const dbCollections = require('../config/firebase')
const db = dbCollections.db;
const validation = require('../validation');

async function addTransaction(id, transactionId, name, amount, date, category, payment) {
    id = validation.checkId(id);
    transactionId = validation.checkId(transactionId);
    name = validation.checkName(name);
    amount = validation.checkNum(amount);
    date = validation.checkString(date);
    category = validation.checkString(category);
    payment = validation.checkString(payment);

    const temp = {
        id: transactionId,
        name: name,
        amount: amount,
        date: date,
        category: category,
        payment: payment,
    }

    const users = db.collection('users');
    const user = await users.doc(id).get();

    if (user.empty) throw 'No user found';

    let userData = user.data();
    let userTransactions = userData.transactions;
    let updatedBalance = userData.accountInfo.bankBalance;
    let updatedCreditBalance = userData.accountInfo.creditBalance;

    //add logic from balance / budget additions for firebase
    if (payment === "Bank"){
        if (category === "Deposit") {
            updatedBalance = updatedBalance + amount;
        } else {
            updatedBalance = updatedBalance + (-1)*amount;
        }
        let newBalance = await users.doc(id).update({
            "accountInfo.bankBalance": updatedBalance,
        })
        if (!newBalance) throw 'Could not update bank balance';
    } else if (payment === "Credit") {
        if (category === "Deposit") {
            updatedCreditBalance = updatedCreditBalance + (-1)* amount;
        } else {
            updatedCreditBalance = updatedCreditBalance + amount;
        }
        let newCreditBalance = await users.doc(id).update({
            "accountInfo.creditBalance": updatedCreditBalance,
        })
        if (!newCreditBalance) throw 'Could not update credit balance';
    }

    //update Budget
    if (category === "Deposit"){
        let updatedIncome = userData.budget.monthIncome + amount;
        let newIncome = await users.doc(id).update({
            "budget.monthIncome": updatedIncome,
        })
        if (!newIncome) throw 'Could not update monthly income';
    } else {
        let findSpending = userData.categories.spending.find(object => {return object.name === category});
        let findIndex = userData.categories.spending.findIndex(object => {return object.name === category});
        if (findSpending) {
            let updatedVariable = userData.budget.monthVariable + amount;
            let newVariable = await users.doc(id).update({
                "budget.monthVariable": updatedVariable,
            })
            if (!newVariable) throw 'Could not update monthly income';
            let tempCategories = userData.categories.spending;
            tempCategories[findIndex].balance = tempCategories[findIndex].balance + amount;
            let newCategory = await users.doc(id).update({
                "categories.spending": tempCategories,
            })
            if (!newCategory) throw 'Could not update spending';
        }
    }

    userTransactions.unshift(temp);

    let updatedTransactions = await users.doc(id).update({
        transactions: userTransactions,
    })
    if (!updatedTransactions) throw 'Could not update transaction';
    return {success: "success"};
}

async function addCategory(id, categoryId, name, amount, isExpense) {
    id = validation.checkId(id);
    categoryId = validation.checkId(categoryId);
    name = validation.checkName(name);
    amount = validation.checkNum(amount);
    isExpense = validation.checkBool(isExpense);

    const temp = {
        id: categoryId,
        name: name,
        amount: amount,
        isExpense: isExpense,
    }

    const users = db.collection('users');
    const user = await users.doc(id).get();

    if (user.empty) throw 'No user found';

    let userData = user.data();
    let userCategories = userData.categories;

    if (isExpense) {
        if (userCategories.expenses.some(e => e.name.toLowerCase().trim() === temp.name.toLowerCase().trim())) throw 'already used';
        userCategories.expenses.push(temp); //add logic from updating budget for expenses
        let updatedExpense = userData.budget.monthRecurring + amount;
        let newExpense = await users.doc(id).update({
            "budget.monthRecurring": updatedExpense,
        })
        if (!newExpense) throw 'Could not update monthly recurring';
    } else {
        if (userCategories.spending.some(e => e.name.toLowerCase().trim() === temp.name.toLowerCase().trim())) throw 'already used';
        temp.balance = 0;
        userCategories.spending.push(temp);
    }

    let updatedCategories = await users.doc(id).update({
        categories: userCategories,
    })

    if (!updatedCategories) throw 'Could not update category';
    return {success: "success"};
}

async function deleteCategory(id, categoryId, isExpense, amount) {
    id = validation.checkId(id);
    categoryId = validation.checkId(categoryId);
    isExpense = validation.checkBool(isExpense);
    amount = validation.checkNum(amount);

    const users = db.collection('users');
    const user = await users.doc(id).get();

    if (user.empty) throw 'No user found';

    let userData = user.data();
    if (isExpense){
        let userExpenses = userData.categories.expenses.filter((e) => e.id !== categoryId);
        let userSpending = userData.categories.spending;
        let updatedCategories = await users.doc(id).update({
            categories: {expenses: userExpenses, spending: userSpending},
        })
        if (!updatedCategories) throw 'Could not update transaction'; 
        
        let updatedExpense = userData.budget.monthRecurring + (-1)*amount;
        let newExpense = await users.doc(id).update({
            "budget.monthRecurring": updatedExpense,
        })
        if (!newExpense) throw 'Could not update monthly recurring';
        
        //add logic for updating budget for expenses
    } else {
        let userExpenses = userData.categories.expenses;
        let userSpending = userData.categories.spending.filter((e) => e.id !== categoryId);
        let updatedCategories = await users.doc(id).update({
            categories: {expenses: userExpenses, spending: userSpending},
        })
        if (!updatedCategories) throw 'Could not update transaction';
    }
    return {success: "success"};
}

async function deleteTransaction(id, transactionId, amount, category, payment) {
    id = validation.checkId(id);
    transactionId = validation.checkId(transactionId);
    amount = validation.checkNum(amount);
    category = validation.checkString(category);
    payment = validation.checkString(payment);

    const users = db.collection('users');
    const user = await users.doc(id).get();

    if (user.empty) throw 'No user found';

    //add logic from balance / budget subtraction for firebase

    let userData = user.data();
    let updatedBalance = userData.accountInfo.bankBalance;
    let updatedCreditBalance = userData.accountInfo.creditBalance;

    console.log("here");

    if (payment === "Bank"){
        if (category === "Deposit") {
            updatedBalance = updatedBalance + (-1)*amount;
        } else {
            updatedBalance = updatedBalance + amount;
        }
        let newBalance = await users.doc(id).update({
            "accountInfo.bankBalance": updatedBalance,
        })
        if (!newBalance) throw 'Could not update bank balance';
    } else if (payment === "Credit") {
        if (category === "Deposit") {
            updatedCreditBalance = updatedCreditBalance + amount;
        } else {
            updatedCreditBalance = updatedCreditBalance + (-1)*amount;
        }
        let newCreditBalance = await users.doc(id).update({
            "accountInfo.creditBalance": updatedCreditBalance,
        })
        if (!newCreditBalance) throw 'Could not update credit balance';
    }

    //update Budget
    if (category === "Deposit"){
        let updatedIncome = userData.budget.monthIncome + (-1)*amount;
        let newIncome = await users.doc(id).update({
            "budget.monthIncome": updatedIncome,
        })
        if (!newIncome) throw 'Could not update monthly income';
    } else {
        let findSpending = userData.categories.spending.find(object => {return object.name === category});
        let findIndex = userData.categories.spending.findIndex(object => {return object.name === category});
        if (findSpending) {
            let updatedVariable = userData.budget.monthVariable + (-1)*amount;
            let newVariable = await users.doc(id).update({
                "budget.monthVariable": updatedVariable,
            })
            if (!newVariable) throw 'Could not update monthly income';
            let tempCategories = userData.categories.spending;
            tempCategories[findIndex].balance = tempCategories[findIndex].balance + (-1)*amount;
            let newCategory = await users.doc(id).update({
                "categories.spending": tempCategories,
            })
            if (!newCategory) throw 'Could not update spending';
        }
    }

    let userTransactions = userData.transactions.filter((t) => t.id !== transactionId);
    console.log(userTransactions)
    let updatedTransactions = await users.doc(id).update({
        transactions: userTransactions,
    })
    if (!updatedTransactions) throw 'Could not update transaction';
    return {success: "success"};
}

async function getAllTransactions(id) {
    id = validation.checkId(id);

    const users = db.collection('users');
    const user = await users.doc(id).get();
    if (user.empty) throw 'No user found';

    let userData = user.data();
    console.log(userData)
    let userTransactions = userData.transactions;

    return userTransactions;
}

async function getAllCategories(id) {
    id = validation.checkId(id);

    const users = db.collection('users');
    const user = await users.doc(id).get();
    if (user.empty) throw 'No user found';

    let userData = user.data();
    let userCategories = userData.categories;

    return userCategories;
}

module.exports = {
    addTransaction,
    getAllTransactions,
    deleteTransaction,
    addCategory,
    deleteCategory,
    getAllCategories,
}