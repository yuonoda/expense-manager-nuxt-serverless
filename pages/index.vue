<template>
  <v-layout class="home">
    <EditDialog :open="isDialogOpen" :editableProps="editableProps" :item="accounts[editedIndex]"
                :new="editedIndex === -1" @edit="editHandler"/>
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
        {{ item.accountBalance | formatCurrency }}
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
import EditDialog from '../components/organisms/EditDialog'
export default {
  components: { EditDialog },
  async asyncData({ store }) {
    const accounts = store.getters['accounts/getAccounts']
    return { accounts }
  },
  data() {
    return {
      isDialogOpen: false,
      editedIndex: -1,
      editableProps: [
        {
          label: 'Name',
          key: 'accountName',
          type: 'text',
        },  {
          label: 'Balance',
          key: 'accountBalance',
          type: 'number',
        },
      ],
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
    editHandler(item) {
      // 更新
      if (this.editedIndex > -1 && item !== null) {
        this.$store.dispatch('accounts/updateAccount', {
          index: this.editedIndex,
          account: item,
        })
      }

      // インデックスをリセットして、ダイアログを閉じる
      this.editedIndex = -1
      this.isDialogOpen = false
    },
    editItem(item) {
      this.editedIndex = this.accounts.indexOf(item)
      this.isDialogOpen = true
    },
  },
}
</script>
<style lang="scss">
.home__table {
  width: 100%;
}
</style>
