<template>
  <v-layout class="home">
    <v-data-table
      :headers="headers"
      :items="transactions"
      :items-per-page="5"
      class="elevation-1 home__table"
      hide-default-footer
      dense
    >
      <template v-slot:item.createdAt="{item}" >
        {{ $moment(item.createdAt).format('MM/DD') }}
      </template>
    </v-data-table>
  </v-layout>
</template>
<script>
export default {
  async asyncData({ $axios, error, store }) {
    const transactions = store.getters['transactions/getTransactions']
    return { transactions }
  },
  watch: {
    transactions() {
      this.transactions = []
    }
  },
  data() {
    return {
      accounts: [],
      headers: [
        {
          text: 'Date',
          align: 'end',
          sortable: false,
          value: 'createdAt', //TODO paid_at
        },
        {
          text: 'Name',
          align: 'end',
          sortable: false,
          value: 'transaction_name',
        },
        { text: 'Amount',
          sortable: false,
          value: 'transaction_amount'
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
