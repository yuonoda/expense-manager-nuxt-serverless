const path = require('path')
const rootPath = path.resolve(__dirname, '../')
const clientPath = path.resolve(__dirname, '../')
const StylelintPlugin = require('stylelint-webpack-plugin');
const STYLELINT = ['./**/*.scss'];

module.exports = {
  plugins: [new StylelintPlugin({
    configFile: '.stylelintrc.yml',
    files: STYLELINT,
    fix : true,
  })],

  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  resolve: {
    alias: {
      'assets': clientPath + '/assets',
    }
  },
  module: {

    rules: [

      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        include: path.resolve(__dirname, '../'),
        exclude: /(node_modules)/,
        options: {
          fix: true,

        }
      },

      {
        test: /\.css?$/,
        loaders: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },

      // Nuxtのデフォルトアセットローダー
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1kB
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1kB
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': clientPath,
      '~': clientPath,
      '@@': rootPath,
      '~~': rootPath,
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}
