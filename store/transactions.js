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
  setTransaction(state, { index, transaction }) {
    // TODO indexがない時
      state.transactions.splice(index, 1, transaction)
  },
  addTransaction(state, {transaction}) {
    state.transactions.splice(state.transactions.length, 1, transaction)
  },
  deleteTransaction(state, index) {
    state.transactions.splice(index, 1)
  },
}

export const actions = {
  createTransaction({ commit }, { transaction }) {
    this.$axios.$post(encodeURI('/transactions'), transaction)
      .then((result) => console.log(result))
      .catch((e) => console.error(e))
    commit('addTransaction', { transaction })
  },
  updateTransaction({ commit }, { index, transaction }) {
    this.$axios
      .$put(encodeURI('/transactions/' + String(transaction.transaction_id)), transaction)
      .then((result) => console.log(result))
      .catch((e) => console.error(e))
    commit('setTransaction', { index, transaction })
  },
  deleteTransaction({ commit }, { index, transaction }) {
    this.$axios
      .$delete(encodeURI('/transactions/' + String(transaction.transaction_id)))
      .then((result) => console.log(result))
      .catch((e) => console.error(e))
    commit('deleteTransaction', index)
  },
}
