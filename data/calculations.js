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
        userCategories.expenses.push(temp);
    } else {
        temp.balance = 0;
        console.log(isExpense);
        userCategories.spending.push(temp);
    }

    let updatedCategories = await users.doc(id).update({
        categories: userCategories,
    })

    if (!updatedCategories) throw 'Could not update category';
    return {success: "success"};
}

async function deleteCategory(id, categoryId, isExpense) {
    id = validation.checkId(id);
    categoryId = validation.checkId(categoryId);
    isExpense = validation.checkBool(isExpense);

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

async function deleteTransaction(id, transactionId) {
    id = validation.checkId(id);
    transactionId = validation.checkId(transactionId);

    const users = db.collection('users');
    const user = await users.doc(id).get();

    if (user.empty) throw 'No user found';

    let userData = user.data();
    console.log(userData.transactions)
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

module.exports = {
    addTransaction,
    getAllTransactions,
    deleteTransaction,
    addCategory,
    deleteCategory,
}