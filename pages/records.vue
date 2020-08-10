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
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Transactions</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        v-model="isCalenderOpen"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            :value="$moment(editedItem.createdAt).format('YYYY-MM-DD')"
                            label="Date"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker :value="$moment(editedItem.createdAt).format('YYYY-MM-DD')"
                                       @input="datePickHandler"
                                       label="Date"></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.transaction_name" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field :value="editedItem.transaction_amount"
                                    @input="editedItem.transaction_amount = Number($event)"label="Amount"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-switch v-model="editedItem.is_paid" label="Paid"></v-switch>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.createdAt="{item}">
        {{ $moment(item.createdAt).format('MM/DD') }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:item.is_paid="{ item }">
        <v-switch :value="item.is_paid" @change="markAsPaid(item)" ></v-switch>
      </template>
    </v-data-table>

  </v-layout>
</template>
<script>
  export default {
    // TODO PULL TO RELOAD
    // TODO ストア側でキャメルとスネークの変換をしたい
    async asyncData({$axios, error, store}) {
      const transactions = store.getters['transactions/getTransactions']
      return {transactions}
    },
    methods: {
      datePickHandler(event) {
        this.editedItem.createdAt = this.$moment(event,'YYYY-MM-DD').format()
        this.isCalenderOpen= false
      },
      markAsPaid(item) {
        item.is_paid = ! item.is_paid
        this.$store.commit('transactions/setTransaction',{ index: this.editedIndex, transaction: item})
      },
      deleteItem(item) {
        const index = this.transactions.indexOf(item)
        this.$store.commit('transactions/deleteTransaction', index)
      },
      close() {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save(){
        if (this.editedIndex > -1) {
          // 更新
          this.$store.commit('transactions/setTransaction',{ index: this.editedIndex, transaction: this.editedItem})
        } else {
          // 追加
          this.$store.commit('transactions/setTransaction',{ transaction: this.editedItem})
        }
        this.close()
      },
      editItem(item) {
        this.editedIndex = this.transactions.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    data() {
      return {
        isCalenderOpen: false,
        accounts: [],
        editedIndex: -1,
        editedItem: {},
        defaultItem: {
          createdAt: this.$moment().format('YYYY-MM-DD'),
          transaction_name: '',
          transaction_amount: 0,
          is_paid: null,
        },
        dialog: false,
        headers: [
          {
            text: 'Date',
            align: 'end',
            sortable: true,
            value: 'createdAt', //TODO paid_at
          },
          {
            text: 'Name',
            align: 'end',
            sortable: false,
            value: 'transaction_name',
          },
          {
            text: 'Amount',
            sortable: false,
            value: 'transaction_amount'
          },
          {
            text: 'Paid',
            sortable: true,
            value: 'is_paid'
          },
          {text: 'Actions', value: 'actions', sortable: false},

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
