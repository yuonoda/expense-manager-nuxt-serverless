import Vue from 'vue'

Vue.filter('formatCurrency', (value, currency = 'JPY', locale = 'ja-JP' ) => {
  if (value === null) return ''
  return new Intl.NumberFormat(locale, {style: 'currency', currency}).format(Number(value))
})
