export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
   const accountsUrl = encodeURI('/accounts')
    const accountsRequest = this.$axios.$get(accountsUrl)
    const requestList = [accountsRequest]

    await Promise.all(requestList)
      .then(val => {
        commit('accounts/setAccounts', val[0].accounts)
      })
      .catch(e => {
        console.error(e.message)
      })
  },
}
