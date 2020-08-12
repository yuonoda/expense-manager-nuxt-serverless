import moment from 'moment'

Vue.filter('formatDate', (value) => {
  return moment(value).format('m/d')
})
