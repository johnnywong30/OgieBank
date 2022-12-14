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
    default: 
      return state
  }
}

export default transactionReducer