const initialState = {
  transactions: [
    {
      id: 1,
      name: 'Chick Fil A',
      amount: 26.21,
      date: '12/31/20',
      category: 'Food',
      payment: 'Credit'
    },
    {
      id: 2,
      name: 'Panera Bread',
      amount: 2.91,
      date: '2/3/21',
      category: 'Food',
      payment: 'Bank'
    },
    {
      id: 3,
      name: 'Starbucks',
      amount: 17.21,
      date: '5/23/21',
      category: 'Drinks',
      payment: 'Bank'
    },
    {
      id: 4,
      name: 'German Bakery',
      amount: 9.54,
      date: '8/23/20',
      category: 'Food',
      payment: 'Credit'
    },
    // create a few transactions from the last week, month, year (today's date is 12/18/22)
    {
      id: 5,
      name: 'Target',
      amount: 23.21,
      date: '12/18/22',
      category: 'Shopping',
      payment: 'Credit'
    },
    {
      id: 6,
      name: 'Walmart',
      amount: 2.91,
      date: '12/17/22',
      category: 'Shopping',
      payment: 'Bank'
    },
    {
      id: 7,
      name: 'Amazon',
      amount: 17.21,
      date: '12/16/22',
      category: 'Shopping',
      payment: 'Bank'
    },
    {
      id: 8,
      name: 'Best Buy',
      amount: 9.54,
      date: '12/15/22',
      category: 'Shopping',
      payment: 'Credit'
    },
    {
      id: 9,
      name: 'Apple',
      amount: 23.21,
      date: '12/01/22',
      category: 'Shopping',
      payment: 'Credit'
    },
    {
      id: 10,
      name: 'Google',
      amount: 2.91,
      date: '6/13/22',
      category: 'Shopping',
      payment: 'Bank'
    }
  ]
}

const transactionReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case "SORT_TRANSACTION": {
      if (payload.sort === 'low') {
        let transactions = state.transactions.sort((a, b) => (a.amount > b.amount) ? 1 : -1)
        return {...state, transactions: transactions}
      }

      else if (payload.sort === 'high') {
        let transactions = state.transactions.sort((a, b) => (a.amount < b.amount) ? 1 : -1)
        return {...state, transactions: transactions}
      }

      else {
        return {...state}
      }
    }
    case "DELETE_TRANSACTION": {
      let transactions = state.transactions.filter((t) => t.id !== payload.transaction)
      return {...state, transactions: transactions}
    }
    case "ADD_TRANSACTION": {
      let newTransaction = payload.transaction;
      if (!newTransaction) return state;
      let transactions = [newTransaction, ...state.transactions];
      return {...state, transactions: transactions};
    }
    // case "GET_ALL_TRANSACTIONS": {
    //   let transactions = payload.transactions;
    //   return {...state, transactions: transactions};
    // }
    default: 
      return state
  }
}

export default transactionReducer