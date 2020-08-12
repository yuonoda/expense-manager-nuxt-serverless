export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
    const urls = ['/accounts', '/transactions']
    const requestList = urls.map((url) => this.$axios.$get(encodeURI(url)))

    await Promise.all(requestList)
      .then((val) => {
        commit('accounts/setAccounts', val[0].accounts)
        commit('transactions/setTransactions', val[1].transactions)
      })
      .catch((e) => {
        console.error(e.message)
      })
  },
}
