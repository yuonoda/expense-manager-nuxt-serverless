import { storiesOf } from '@storybook/vue'
import EditDialog from './EditDialog.vue'
import { boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'


storiesOf('organisms | EditDialog', module).add('EditDialog', () => {
  return {
    components: { EditDialog },
    template: `<EditDialog :item="item" :open="open" :new="newVal" @edit="edit" :editableProps="editableProps"/>`,
    props: {
      open: {
         default: boolean('open', true)
      },
      newVal: {
        default: boolean('new', true)
      },
    },
    methods: {
      edit: action('edit'),
    },
    data() {
      return {
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
        item:{
          "transactionId": 1,
          "accountId": 1,
          "transactionName": "家賃",
          "transactionAmount": 80000,
          "paidAt": "2020-08-31T01:48:09.946Z",
          "isPaid": true,
          "createdAt": "2020-08-13T01:55:18.730Z",
          "updatedAt": "2020-08-13T01:55:38.810Z",
          "deletedAt": null,
          "version": 0
        }
      }
    }
  }
})
