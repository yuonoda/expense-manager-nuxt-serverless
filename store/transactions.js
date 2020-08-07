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
}

export const actions = {}
