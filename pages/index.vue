<template>
  <v-layout class="home">
    <v-data-table
      :headers="headers"
      :items="accounts"
      :items-per-page="5"
      class="elevation-1 home__table"
      hide-default-footer
    ></v-data-table>
  </v-layout>
</template>
<script>
export default {
  async asyncData({ $axios, error }) {
    const accountsUrl = encodeURI('/accounts')
    let accounts = []
    await $axios.$get(accountsUrl).then(result => {
      console.log(result)
      accounts = result.accounts
    }).catch(e => {
      console.error(e);
      error({ statusCode: 404, message: "Page not found" });
    })

    return {accounts}
  },
  // created() {
  //   this.fetchAccounts();
  // },
  data() {
    return {
      accounts: [],
      headers: [
        {
          text: 'Account Name',
          align: 'end',
          sortable: false,
          value: 'account_name',
        },
        { text: 'Balance',
          sortable: false,
          value: 'account_balance'
        },
      ],
    }
  },
  methods: {
    // fetchAccounts(){
    //   console.log('fetchAccounts')
    //   const accountsUrl = encodeURI('/accounts')
    //   this.$axios.$get(accountsUrl).then(result => {
    //     console.log(result)
    //     this.accounts = result.accounts
    //   }).catch(e => {
    //     console.error(e);
    //     error({ statusCode: 404, message: "Page not found" });
    //   })
    // }
  }
}
</script>
<style lang="scss">
.home__table {
  width: 100%;
}
</style>
