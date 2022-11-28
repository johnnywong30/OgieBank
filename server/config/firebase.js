// https://firebase.google.com/docs/firestore/quickstart
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceaccount.json')

initializeApp({
  credential: cert(serviceAccount)
})

const db = getFirestore();

module.exports = {
  db: db
}