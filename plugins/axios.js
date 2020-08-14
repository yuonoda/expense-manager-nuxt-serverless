import https from 'https'

/**
 * キャメルとスネークを変換する
 * @param arg
 * @param isSnakeToCamel
 * @returns {{}|*}
 */
const convertSnakeCamel = (arg, isSnakeToCamel = true) => {
  if (Array.isArray(arg)) {
    return arg.map(element => convertSnakeCamel(element, isSnakeToCamel))
  } else if (typeof arg == 'object' && arg !== null) {
    let replaced = {}
    Object.keys(arg).forEach(key => {
      let replacer
      let searchRegex
      if (isSnakeToCamel) {
        replacer = (x, y) => {
          return y.toUpperCase()
        }
        searchRegex = /_([a-z])/g
      } else {
        replacer = (x, y) => {
          return '_' + y.toLowerCase()
        }
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

export default function(context, inject) {
  // Create a custom axios instance
  const api = context.$axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*',
      },
    },
  })

  // Covert camel and snake
  api.onRequest((config) => {
    config.httpsAgent = new https.Agent({
      rejectUnauthorized: process.env.NODE_ENV === 'production',
    })
    config.data = convertSnakeCamel(config.data, false)
  })
  api.onResponse(response => {
    response.data = convertSnakeCamel(response.data)
  })

  // Set base urls
  api.setBaseURL(process.env.BASE_URL)
  api.browserBaseURL = process.env.BROWSER_BASE_URL

  inject('axios', api)
}
