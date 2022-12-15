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
    deleteTransaction
}