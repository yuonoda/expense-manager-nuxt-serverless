<template>
  <v-layout class="transactions">
    <EditDialog :open="isDialogOpen" :editableProps="editableProps" :item="transactions[editedIndex]"
                :new="editedIndex === -1" @edit="editHandler"/>
    <v-data-table
      :headers="headers"
      :items="transactions"
      :items-per-page="100"
      class="elevation-1 transactions__table"
      hide-default-footer
      dense
      :sort-by="'transaction_time'"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Transactions</v-toolbar-title>
          <v-divider class="mx-4" inset vertical/>
          <v-spacer/>
          <v-btn color="primary" dark class="mb-2" @click="editItem()">
            New Item
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.paidAt="{ item }">
        {{ formatDate(item.paidAt, 'MM/DD') }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:item.transactionAmount="{ item }" >
        {{ item.transactionAmount | formatCurrency }}
      </template>
      <template v-slot:item.isPaid="{ item }">
        <v-switch :input-value="item.isPaid" @change="markAsPaid(item)"></v-switch>
      </template>
    </v-data-table>
  </v-layout>
</template>
<script>
  import EditDialog from '../components/organisms/EditDialog'

  export default {
    // TODO PULL TO RELOAD
    // TODO 日付のクリアボタン
    components: { EditDialog },
    async asyncData({ store }) {
      const transactions = store.getters['transactions/getTransactions']
      return { transactions }
    },
    data() {
      return {
        editedIndex: -1,
        isDialogOpen: false,
        headers: [
          {
            text: 'Date',
            align: 'end',
            sortable: true,
            value: 'paidAt',
          },
          {
            text: 'Name',
            align: 'end',
            sortable: false,
            value: 'transactionName',
          },
          {
            text: 'Amount',
            sortable: false,
            value: 'transactionAmount',
          },
          {
            text: 'Paid',
            sortable: true,
            value: 'isPaid',
          },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        editableProps: [
          {
            label: 'Date',
            key: 'paidAt',
            type: 'date',
          },
          {
            label: 'Name',
            key: 'transactionName',
            type: 'text',
          }, {
            label: 'Amount',
            key: 'transactionAmount',
            type: 'number',
          }, {
            label: 'Is paid',
            key: 'isPaid',
            type: 'boolean',
          },
        ],
      }
    },
    methods: {
      formatDate(date, format) {
        if (!date) return null
        return this.$moment(date).format(format)
      },
      markAsPaid(item) {
        const editedItem = Object.assign({}, item)
        editedItem.isPaid = !editedItem.isPaid
        const index = this.transactions.indexOf(item)
        this.$store.dispatch('transactions/updateTransaction', { index, transaction: editedItem })
      },
      deleteItem(item) {
        const index = this.transactions.indexOf(item)
        this.$store.dispatch('transactions/deleteTransaction', { index, transaction: item })
      },
      editHandler(item) {
        // 更新
        if (this.editedIndex > -1 && item !== null) {
          this.$store.dispatch('transactions/updateTransaction', {
            index: this.editedIndex,
            transaction: item,
          })
        }

        // 追加
        if (this.editedIndex === -1 && item !== null) {
          this.$store.dispatch('transactions/createTransaction', { transaction: item })
        }

        // インデックスをリセットして、ダイアログを閉じる
        this.editedIndex = -1
        this.isDialogOpen = false
      },
      editItem(item) {
        this.editedIndex = this.transactions.indexOf(item)
        this.isDialogOpen = true
      },
    },
  }
</script>
<style lang="css" scoped>
  .transactions__table {
    width: 100%;
    margin-bottom: 56px;
  }
</style>
