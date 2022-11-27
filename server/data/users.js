const bcrypt = require('bcrypt');
const saltRounds = 16;
const validation = require('../validation');
// firestore db
const db = require('../config/firebase')
const users = db.collection('users')

// https://stackoverflow.com/questions/69012256/how-do-you-find-a-document-by-its-id-using-version-9-of-the-firebase-js-sdk
async function getUser(id) {
    id = validation.checkId(id);
    const docRef = users.doc(db, 'users', id)
    const user = await docRef.get()
    if (!user.exists()) throw 'Error: No user with given id';
    user._id = user._id.toString();
    return user;
}

// https://firebase.google.com/docs/firestore/query-data/queries#node.js_1
async function getUserByUsername(username) {
    username = validation.checkUsername(username);
    const user = await users.where('username', '==', username).get()
    if (user.empty()) throw `Error: No user with given username`
    if (user) {user._id = user._id.toString();}
    
    return user;
}

async function getUserByEmail(email) {
    email = validation.checkEmail(email);
    const user = await users.where('email', '==', email).get()
    if (user.empty()) throw `Error: No user with given email`
    if (user) {user._id = user._id.toString();}
    return user;
}

module.exports = {
    getUser,
    getUserByUsername
}