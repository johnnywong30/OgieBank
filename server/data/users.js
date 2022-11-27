const bcrypt = require('bcrypt');
const saltRounds = 16;
const validation = require('../validation');
// firestore db
const dbCollections = require('../config/firebase')
const db = dbCollections.db

// https://stackoverflow.com/questions/69012256/how-do-you-find-a-document-by-its-id-using-version-9-of-the-firebase-js-sdk
async function getUser(id) {
    id = validation.checkId(id);
    const users = db.collection('users')
    const docRef = users.doc(db, 'users', id)
    const user = await docRef.get()
    if (!user.exists()) throw 'Error: No user with given id';
    user._id = user._id.toString();
    return user;
}

// https://firebase.google.com/docs/firestore/query-data/queries#node.js_1
async function getUserByUsername(username) {
    username = validation.checkUsername(username);
    const users = db.collection('users')
    const user = await users.where('username', '==', username).get()
    if (user.empty()) throw `Error: No user with given username`
    if (user) {user._id = user._id.toString();}
    
    return user;
}

async function getUserByEmail(email) {
    email = validation.checkEmail(email);
    const users = db.collection('users')
    const user = await users.where('email', '==', email).get()
    if (user.empty()) throw `Error: No user with given email`
    if (user) {user._id = user._id.toString();}
    return user;
}

//https://stackoverflow.com/questions/52100103/getting-all-documents-from-one-collection-in-firestore
async function getAllUsers() {
    const users = db.collection('users')
    const userList = users.get()
    if (!userList) throw 'Error: Could not get all users';
    return userList.docs.map(doc => doc.data());
}

async function checkUser(username, password) {
    username = validation.checkUsername(username);
    password = validation.checkPassword(password);
    
    let user = await getUserByUsername(username);
    if (!user) throw 'Either the username or password is invalid.';

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) throw 'Either the username or password is invalid.';
    return {id: user._id};
}

async function confirmPassword(password1, password2, hash) {
    password1 = validation.checkPassword(password1);
    password2 = validation.checkPassword(password2);

    if (hash) {
        const compare = await bcrypt.compare(password2, password1);
        if (!compare) throw 'Password fields must match.';
    } else {
        if (password1 !== password2) throw 'Password fields must match.';
    }
    return password2;
}

// https://firebase.google.com/docs/firestore/manage-data/add-data
async function createUser(firstName, lastName, username, password, email) {
    firstName = validation.checkString(firstName, 'first name');
    lastName = validation.checkString(lastName, 'last name');
    username = validation.checkUsername(username);
    password = validation.checkPassword(password);
    email = validation.checkEmail(email);

    if (await getUserByUsername(username)) throw 'Error: username is taken';

    const hash = await bcrypt.hash(password, saltRounds);
    const users = db.collection('users')
    let newUser = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: hash,
        email: email,
        accountInfo: {
            bankName: "",
            bankBalance: 0,
            creditName: "",
            creditBalance: 0,
            creditLimit: 0,
        },
        payInfo: {
            amount: 0,
            date: "",
            month: 0,
            isWeekly: true,
        },
        budget: {
            monthIncome: 0,
            monthDeposit: 0,
            monthRecurring: 0,
            monthVariable: 0,
            weekAllocated: 0,
            weekDeposit: 0,
            weekVariable: 0,
        },
        categories: {
            expenses: [],
            spending: [],
        },
        transactions: [],
        summary: [],
    };
    const insertInfo = await users.add(newUser);
    if (!insertInfo) throw 'Error: Could not add user';
    return {userInserted: true};
}

// https://firebase.google.com/docs/firestore/manage-data/delete-data
async function removeUser(id) {
    id = validation.checkId(id);

    const user = await this.getUser(id);
    const username = user.username;
    const users = db.collection('users')
    const deletionInfo = await users.doc(id).delete()
    if (!deletionInfo) {
      throw `Error: Could not delete user with id of ${id}`;
    }
    return `${username} has been successfully deleted`;
}

module.exports = {
    getUser,
    getUserByUsername,
    getUserByEmail,
    getAllUsers,
    checkUser,
    confirmPassword,
    createUser,
    removeUser
}