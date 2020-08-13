<template>
  <v-dialog v-model="open" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4" v-for="prop in editableProps">
              <v-text-field v-if="prop.type === 'text'" :label="prop.label" :value="editedItem[prop.key]"
                            @input="editedItem[prop.key] = String($event)"/>
              <v-text-field v-else-if="prop.type === 'number'" :label="prop.label" :value="editedItem[prop.key]"
                            @input="editedItem[prop.key] = Number($event)"/>
              <v-switch v-else-if="prop.type === 'boolean'" :label="prop.label" :input-value="editedItem[prop.key]"
                            @change="editedItem[prop.key] = Boolean($event)"
                            />
              <v-menu
                v-else-if="prop.type === 'date'"
                v-model="isCalenderOpen"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formatDate(editedItem[prop.key], 'YYYY-MM-DD')"
                    label="Date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  :value="formatDate(editedItem[prop.key], 'YYYY-MM-DD')"
                  label="Date"
                  @input="datePickHandler($event, prop.key)"
                />
              </v-menu>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="blue darken-1" text @click="close">
          Cancel
        </v-btn>
        <v-btn color="blue darken-1" text @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    props: {
      item: {
        type: Object, default: () => {
        },
      },
      editableProps: { type: Array, default: () => []},
      open: { type: Boolean, default: false },
      new: { type: Boolean, default: false },
    },
    created() {
      this.editedItem = Object.assign({}, this.item)
    },
    watch: {
      item(newItem) {
        this.editedItem = Object.assign({}, newItem)
      },
    },
    data() {
      return {
        editedIndex: -1,
        isCalenderOpen: false,
        editedItem: {},
        dialog: false,
      }
    },
    methods: {
      formatDate(date, format) {
        if (!date) return null
        console.debug(this)
        return this.$moment(date).format(format)
      },
      datePickHandler(event, key) {
        console.log(key)
        this.editedItem[key] = this.$moment(event, 'YYYY-MM-DD').format()
        this.isCalenderOpen = false
      },
      close() {
        this.$emit('edit', this.editedItem)
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, {})
        })
      },
      save() {
        this.$emit('edit', this.editedItem)
        this.close()
      },
    },
    computed: {
      formTitle() {
        return this.new ? 'New Item' : 'Edit Item'
      },
    },
  }
</script>
<style scoped lang="scss">
  // TODO Turn buttons into default color
</style>
