export const state = () => ({
  transactions: [],
})

export const getters = {
  getTransactions(state) {
    return state.transactions
  },
}

export const mutations = {
  setTransactions(state, transactions) {
    state.transactions = transactions
  },
  // TODO APIも更新
  setTransaction(state, { index, transaction }) {
    if (index === null) {
      state.transactions.splice(state.transactions.length, 1, transaction)
    } else {
      state.transactions.splice(index, 1, transaction)
    }
  },
  deleteTransaction(state, index) {
    state.transactions.splice(index, 1)
  }
}

export const actions = {}
