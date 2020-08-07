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
  async asyncData({ $axios, error, store }) {
    console.debug('asyncData')
    const accounts = store.getters['accounts/getAccounts']
    return { accounts }
  },
  data() {
    return {
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
  }
}
</script>
<style lang="scss">
.home__table {
  width: 100%;
}
</style>
