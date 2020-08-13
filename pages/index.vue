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
      <template v-slot:item.accountBalance="{ item }">
        {{ item.accountBalance }}
        <v-input v-model="item.accountBalance" />
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
  async asyncData({ store }) {
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
          value: 'accountName',
        },
        { text: 'Balance', sortable: false, value: 'accountBalance' },
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
