const bcrypt = require('bcrypt');
const saltRounds = 16;
const { v4: uuidv4 } = require('uuid');

// firestore db
const dbCollections = require('./firebase');
const { db } = dbCollections;

const PASSWORD = 'password'

const ACCOUNT_INFO = {
    bankName: 'Chase',
    bankBalance: 0,
    creditName: 'Chase Sapphire',
    creditBalance: 0,
    creditLimit: 0
}

const PAY_INFO = {
    amount: 0,
    date: '',
    month: 11
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
        transactions,
        id: uuidv4()
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

const generateSpendingCategory = (name, amount, balance=0) => {
    const id = uuidv4()
    const isExpense = ''
    return {
        id,
        name,
        amount,
        isExpense,
        balance
    }
}

// Start Adding Users
const users = db.collection('users')

// Check if exists already -> if does, delete them and replace
const deleteIfExists = async (user) => {
    const { email } = user
    const userList = await users.where('email', '==', email).get()
    userList.forEach(async doc => {
        const id = doc.id
        const deletionInfo = await users.doc(id).delete()
        if (deletionInfo) console.log(`able to deleted previous account with ${email}`)
    })
    return true
}

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
    await deleteIfExists(cleanUser)
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
        creditBalance: 0,
        creditLimit: 1000,
        creditName: 'Discover'
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
        month: 11
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
        username,
    }
    await deleteIfExists(bippy)
    await users.add(bippy)
}

// Beebo
// beebo30@gmail.com
// password
const addBeebo = async () => {
    const firstName = 'Beebo'
    const lastName = 'Bibs'
    const username = 'beebo30'
    const password = await bcrypt.hash(PASSWORD, saltRounds)
    const email = 'beebo30@gmail.com'
    const accountInfo = {
        bankBalance: 48425,
        bankName: 'Chase',
        creditBalance: 250,
        creditLimit: 20000,
        creditName: 'Chase Sapphire'
    }
    const budget = {
        monthIncome: 50000,
        monthRecurring: 2200,
        monthVariable: 150
    }

    const expenses = [
        {name: 'Rent', amount: 1000},
        {name: 'Kids', amount: 500},
        {name: 'Groceries', amount: 500},
        {name: 'Utilities', amount: 200}
    ].map(({name, amount}) => {
        return generateExpenseCategory(name, amount)
    })

    const spending = [
        {name: 'Fun Dollars', amount: 500, balance: 0},
        {name: 'Substances', amount: 500, balance: 175}
    ].map(({name, amount, balance}) => {
        return generateSpendingCategory(name, amount, balance)
    })

    const categories = {
        expenses,
        spending
    }
    const payInfo = {
        amount: 0,
        date: '',
        month: 11
    }
    const transactions = [
        {
            amount: 500,
            category: 'Kids',
            date: '12/15/2022',
            id: uuidv4(),
            name: 'Child Support',
            payment: 'Bank'
        },
        {
            amount: 50,
            category: 'Utilities',
            date: '12/01/2022',
            id: uuidv4(),
            name: 'Verizon',
            payment: 'Bank'
        },
        {
            amount: 100,
            category: 'Groceries',
            date: '12/19/2022',
            id: uuidv4(),
            name: 'Shoprite',
            payment: 'Credit'
        },
        {
            amount: 1000,
            category: 'Rent',
            date: '12/19/2022',
            id: uuidv4(),
            name: 'December Rent',
            payment: 'Bank'
        },
        {
            amount: 150,
            category: 'Substances',
            date: '12/19/2022',
            id: uuidv4(),
            name: 'Cookies',
            payment: 'Credit'
        },
        {
            amount: 50000,
            category: 'Deposit',
            date: '12/15/2022',
            id: uuidv4(),
            name: 'Momma',
            payment: 'Bank'
        }
    ]
    const NUM_FAKE = 25

    const createFakeTransaction = () => ({
        amount: 1,
        category: 'Substances',
        date: '12/15/2022',
        id: uuidv4(),
        name: 'Cheap Drug',
        payment: 'Bank'
    })

    const fakeTransactions = [...Array(NUM_FAKE).keys()].map(createFakeTransaction)
    const allTransactions = [...transactions, ...fakeTransactions]
    const beebo = {
        accountInfo,
        budget,
        categories,
        email,
        firstName,
        lastName,
        password,
        payInfo,
        transactions: allTransactions,
        username,
    }
    await deleteIfExists(beebo)
    await users.add(beebo)
}

const seed = async () => {
    console.log('...Adding ogiedog123@gmail.com ...')
    await addCleanUser()
    console.log('Success!')

    console.log('...Adding bippy123@gmail.com ...')
    await addBippy() 
    console.log('Success!')

    console.log('...Adding beebo30@gmail.com ...')
    await addBeebo()
    console.log('Success!')
}

seed()