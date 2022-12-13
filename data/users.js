const bcrypt = require('bcrypt');
const saltRounds = 16;
const validation = require('../validation');
// firestore db
const dbCollections = require('../config/firebase')
const db = dbCollections.db

// jordan tested
// https://stackoverflow.com/questions/69012256/how-do-you-find-a-document-by-its-id-using-version-9-of-the-firebase-js-sdk
async function getUser(id) {
    id = validation.checkId(id);
    const users = db.collection('users')
    const user = await users.doc(id).get()
    if (user.empty) throw `Error: unable to find user with given id`
    return user.data()
}

// https://firebase.google.com/docs/firestore/query-data/queries#node.js_1
// jordan tested
async function getUserByUsername(username) {
    username = validation.checkUsername(username);
    const users = db.collection('users')
    const user = await users.where('username', '==', username).get()
    if (user.empty) return user //handle error in route
    let userData
    let id
    user.forEach(doc => {
        id = doc.id
        userData = doc.data()
    })
    return {
        ...userData,
        id: id
    };
}

// jordan tested
async function getUserByEmail(email) {
    email = validation.checkEmail(email);
    const users = db.collection('users')
    const user = await users.where('email', '==', email).get()
    if (user.empty) return user //handle error in route
    let userData
    let id
    user.forEach(doc => {
        id = doc.id
        userData = doc.data()
    })
    return {
        ...userData,
        id: id
    };
}

// did not test
//https://stackoverflow.com/questions/52100103/getting-all-documents-from-one-collection-in-firestore
async function getAllUsers() {
    const users = db.collection('users')
    const userList = users.get()
    if (!userList) throw 'Error: Could not get all users';
    return userList.docs.map(doc => doc.data());
}

// logs in the user by username
async function checkUserByUsername(username, password) {
    username = validation.checkUsername(username);
    password = validation.checkPassword(password);
    
    let user = await getUserByUsername(username);
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) throw 'Either the username or password is invalid.';
    delete user['password']
    return {
        loggedIn: true,
        ...user
    };
}

// jordan tested
// logs in the user by email
async function checkUserByEmail(email, password) {
    email = validation.checkEmail(email);
    password = validation.checkPassword(password);
    
    let user = await getUserByEmail(email);
    if (!user.password) throw `Error: account exists with provider!`
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) throw 'Either the email or password is invalid.';
    delete user['password']
    return {
        loggedIn: true,
        ...user
    };
}

// jordan tested
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

// jordan tested
// https://firebase.google.com/docs/firestore/manage-data/add-data
async function createUser(firstName, lastName, username, password, email) {
    firstName = validation.checkName(firstName, 'first name');
    lastName = validation.checkName(lastName, 'last name');
    username = validation.checkUsername(username);
    password = validation.checkPassword(password);
    email = validation.checkEmail(email);
    
    // check if user with that username or email exist already
    const usernameExists = await getUserByUsername(username)
    if (!usernameExists.empty) throw `Error: username already exists`
    const emailExists = await getUserByEmail(email)
    if (!emailExists.empty) throw `Error: email already exists`

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
        },
        budget: {
            monthIncome: 0,
            monthDeposit: 0,
            monthRecurring: 0,
            monthVariable: 0,
        },
        categories: {
            expenses: [],
            spending: [],
        },
        transactions: [],
    };
    const insertInfo = await users.add(newUser);
    if (!insertInfo) throw 'Error: Could not add user';
    return {userInserted: true};
}

// jordan tested
// Auth users don't have a password field!
async function createUserByAuth(uid, displayName, email) {
    uid = validation.checkString(uid)
    displayName = validation.checkString(displayName, 'display name');
    email = validation.checkEmail(email);
    // check if user with that email exists already
    const emailExists = await getUserByEmail(email)
    if (!emailExists.empty) throw `Error: email already exists`
    const users = db.collection('users')
    let newUser = {
        displayName: displayName,
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
        },
        budget: {
            monthIncome: 0,
            monthDeposit: 0,
            monthRecurring: 0,
            monthVariable: 0,
        },
        categories: {
            expenses: [],
            spending: [],
        },
        transactions: [],
    };
    const insertInfo = await users.doc(uid).set(newUser);
    if (!insertInfo) throw 'Error: Could not add user with auth';
    return {userInserted: true};
}

// did not test, idk if we'll use this
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

// jordan tested
async function updateUsername(id, username) {
    id = validation.checkId(id)
    username = validation.checkUsername(username)

    const userExists = await getUserByUsername(username)
    if (!userExists.empty) throw `Username is taken`

    const users = db.collection('users')
    const updateInfo = await users.doc(id).update({
        username: username
    })
    console.log(updateInfo)
    const user = await getUser(id)
    return user;
}

// not tested
async function updatePassword(id, password) {
    id = validation.checkId(id)
    password = validation.checkPassword(password)

    const hash = await bcrypt.hash(password, saltRounds)
    const users = db.collection('users')
    const updateInfo = await users.doc(id).update({
        password: hash
    })  
    console.log(updateInfo)
    const user = await getUser(id)
    return user
}

module.exports = {
    getUser,
    getUserByUsername,
    getUserByEmail,
    getAllUsers,
    checkUserByUsername,
    checkUserByEmail,
    confirmPassword,
    createUser,
    createUserByAuth,
    removeUser,
    updateUsername,
    updatePassword
}