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
}

export const actions = {}
