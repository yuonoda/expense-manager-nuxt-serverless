import https from 'https'

/**
 * キャメルとスネークを変換する
 * @param arg
 * @param isSnakeToCamel
 * @returns {{}|*}
 */
const convertSnakeCamel = (arg, isSnakeToCamel = true) => {
  if (Array.isArray(arg) ) {
    return arg.map(element => convertSnakeCamel(element, isSnakeToCamel))
  } else if (typeof arg == 'object' && arg !== null) {
    let replaced = {}
    Object.keys(arg).forEach(key => {
      let replacer
      let searchRegex
      if (isSnakeToCamel) {
        replacer = (x,y) => {return y.toUpperCase()}
        searchRegex = /_([a-z])/g
      } else {
        replacer = (x,y) => {return "_" + y.toLowerCase()}
        searchRegex = /([A-Z])/g
      }
      const newKey = key.replace(searchRegex, replacer)
      replaced[newKey] = convertSnakeCamel(arg[key], isSnakeToCamel)
    })
    return replaced
  } else {
    return arg
  }
}

export default function ({ $axios, app, store }) {
  $axios.onRequest((config) => {
    config.httpsAgent = new https.Agent({
      rejectUnauthorized: process.env.NODE_ENV === 'production',
    })
    config.data = convertSnakeCamel(config.data, false)
  })
  $axios.onResponse( response => {
    response.data = convertSnakeCamel(response.data)
  })
}
