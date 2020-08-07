<template>
  <v-layout class="home">
    records
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
  }
}
</script>
<style lang="scss">
.home__table {
  width: 100%;
}
</style>
