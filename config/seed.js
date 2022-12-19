const bcrypt = require('bcrypt');
const saltRounds = 16;
const validation = require('../validation');
const { v4: uuidv4 } = require('uuid');

// firestore db
const dbCollections = require('./firebase');
const { db } = dbCollections;

const FIRSTNAMES = ['Ogie', 'Bippy', 'Beebo']
const LASTNAMES = ['Dog', 'Chinners', 'Bibs']
const USERNAMES = ['ogiedog123', 'bippy123', 'beebo30']
const EMAILS = ['ogiedog@gmail.com', 'bippy@gmail.com', 'beebo@gmail.com']
const PASSWORD = 'password'

const ACCOUNT_INFO = {
    bankName: 'Chase',
    bankBalance: 0,
    creditName: 'Chase',
    creditBalance: 0,
    creditLimit: 0
}

const PAY_INFO = {
    amount: 0,
    date: '',
    month: 0
}

const BUDGET = {
    monthIncome: 0,
    monthRecurring: 0,
    monthVariable: 0
}

const CATEGORIES = {
    expenses: [],
    spending: []
}
const TRANSACTIONS = []

const generateUser = async (firstName, lastName, username, email, categories, transactions, password=PASSWORD) => {
    const hash = await bcrypt.hash(password, saltRounds)
    return {
        firstName,
        lastName,
        username,
        password: hash,
        email,
        accountInfo: ACCOUNT_INFO,
        payInfo: PAY_INFO,
        budget: BUDGET,
        categories,
        transactions
    }
}

const generateExpenseCategory = (name, amount) => {
    const id = uuidv4()
    const isExpense = 'true'
    return {
        id,
        name,
        amount,
        isExpense
    }
}

const generateSpendingCategory = (name, amount) => {
    const id = uuidv4()
    const isExpense = ''
    return {
        id,
        name,
        amount,
        isExpense,
        balance: 0
    }
}

// Start Adding Users
const users = db.collection('users')

// Clean User
const addCleanUser = async () => {
    // const generateUser = async (firstName, lastName, username, email, categories, transactions, password=PASSWORD) => {
    const firstName = 'Ogie'
    const lastName = 'Dog'
    const username = 'ogiedog123'
    const email = 'ogiedog123@gmail.com'
    const categories = CATEGORIES
    const transactions = TRANSACTIONS
    const cleanUser = await generateUser(firstName, lastName, username, email, categories, transactions)
    await users.add(cleanUser)
}


// Bippy has $10,000 to spend before going into debt
// bippy123@gmail.com
// password
const addBippy = async () => {
    const firstName = 'Bippy'
    const lastName = 'Bibs'
    const username = 'bippy123'
    const password = await bcrypt.hash(PASSWORD, saltRounds)
    const email = 'bippy123@gmail.com'
    const accountInfo = {
        bankBalance: 10000,
        bankName: 'Chase',
        creditBalannce: 0,
        creditLimit: 1000,
        creditName: 'Chase'
    }
    const budget = {
        monthIncome: 10000,
        monthRecurring: 0,
        monthVariable: 0
    }
    const categories = {
        expenses: [],
        spending: []
    }
    const payInfo = {
        amount: 0,
        date: '',
        month: 0
    }
    const transactions = [
        {
            amount: 10000,
            category: 'Deposit',
            date: '12/19/2022',
            id: uuidv4(),
            name: 'BEEBO PAID ME',
            payment: 'Bank'
        }
    ]
    const bippy = {
        accountInfo,
        budget,
        categories,
        email,
        firstName,
        lastName,
        password,
        payInfo,
        transactions,
        username
    }
    await users.add(bippy)
}

// Beebo
// beebo30@gmail.com
// password
// TODO: beebo
const addBeebo = async () => {
    const firstName = 'Beebo'
    const lastName = 'Bibs'
    const username = 'beebo30'
    const password = await bcrypt.hash(PASSWORD, saltRounds)
    const email = 'beebo30@gmail.com'
    const accountInfo = {
        bankBalance: 10000,
        bankName: 'Chase',
        creditBalannce: 0,
        creditLimit: 1000,
        creditName: 'Chase'
    }
    const budget = {
        monthIncome: 10000,
        monthRecurring: 0,
        monthVariable: 0
    }
    const categories = {
        expenses: [],
        spending: []
    }
    const payInfo = {
        amount: 0,
        date: '',
        month: 0
    }
    const transactions = [
        {
            amount: 10000,
            category: 'Deposit',
            date: '12/19/2022',
            id: uuidv4(),
            name: 'BEEBO PAID ME',
            payment: 'Bank'
        }
    ]
    const bippy = {
        accountInfo,
        budget,
        categories,
        email,
        firstName,
        lastName,
        password,
        payInfo,
        transactions,
        username
    }
    await users.add(bippy)
}