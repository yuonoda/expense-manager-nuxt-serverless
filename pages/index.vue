<template>
  <v-layout class="home">
    <v-data-table
      :headers="headers"
      :items="accounts"
      :items-per-page="5"
      class="elevation-1 home__table"
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Accounts</v-toolbar-title>
          <v-divider class="mx-4" inset vertical />
          <v-spacer />
        </v-toolbar>
      </template>
      <template v-slot:item.account_balance="{ item }">
        {{ item.account_balance }}
        <v-input v-model="item.account_balance" />
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
  </v-layout>
</template>
<script>
export default {
  async asyncData({ $axios, error, store }) {
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
        { text: 'Balance', sortable: false, value: 'account_balance' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  methods: {
    editItem(item) {
      console.debug('editItem')
    },
  },
}
</script>
<style lang="scss">
.home__table {
  width: 100%;
}
</style>
