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
  async createTransaction({ commit }, { transaction }) {
    await this.$axios.$post(encodeURI('/transactions'), transaction)
      .catch((e) => console.error(e))
    commit('addTransaction', { transaction })
  },
  async updateTransaction({ commit }, { index, transaction }) {
    await this.$axios
      .$put(encodeURI('/transactions/' + String(transaction.transactionId)), transaction)
      .catch((e) => console.error(e))
    commit('setTransaction', { index, transaction })
  },
  async deleteTransaction({ commit }, { index, transaction }) {
    await this.$axios
      .$delete(encodeURI('/transactions/' + String(transaction.transactionId)))
      .catch((e) => console.error(e))
    commit('deleteTransaction', index)
  },
}
