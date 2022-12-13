const initialState = {
  transactions: [
    {
      id: 1,
      name: 'Chick Fil A',
      amount: 26.21,
      date: '12/31/20',
      category: 'Food',
      payment: 'Discover'
    },
    {
      id: 2,
      name: 'Panera Bread',
      amount: 2.91,
      date: '2/3/21',
      category: 'Food',
      payment: 'Debit'
    },
    {
      id: 3,
      name: 'Starbucks',
      amount: 17.21,
      date: '5/23/21',
      category: 'Drinks',
      payment: 'Chase'
    },
    {
      id: 4,
      name: 'German Bakery',
      amount: 9.54,
      date: '8/23/20',
      category: 'Food',
      payment: 'Discover'
    }
  ]
}

const transactionReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case "DELETE_TRANSACTION":
      let transactions = state.transactions.filter((t) => t.id !== payload.id)
      return {...state, transactions: transactions}
    default: 
      return state
  }
}

export default transactionReducer