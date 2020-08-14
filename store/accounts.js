export const state = () => ({
  accounts: [],
})

export const getters = {
  getAccounts(state) {
    return state.accounts
  },
}

export const mutations = {
  setAccounts(state, accounts) {
    state.accounts = accounts
  },
  setAccount(state, { index, account }) {
    // TODO indexがない時
    state.accounts.splice(index, 1, account)
  },
}

export const actions = {
  async updateAccount({ commit }, { index, account }) {
    await this.$axios
      .$put(encodeURI('/accounts/' + String(account.accountId)), account)
      .catch((e) => console.error(e))
    commit('setAccount', { index, account })
  },
}
