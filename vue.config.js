// const autoprefixer = require('autoprefixer')
// const pxtorem = require('postcss-pxtorem')
module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.lottery.dev.719471.net',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/stock': {
        target: 'http://data.gtimg.cn',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/stock': ''
        }
      }
    }
  }
  // devServer: {
  //   proxy: 'http://api.stock.dev.719471.net'
  // },
  // css: {
  //   // modules:false,
  //   // extract:true,
  //   sourceMap: false,
  //   loaderOptions: {
  //     postcss: {
  //       plugins: [
  //         autoprefixer(),
  //         pxtorem({
  //           rootValue: 37.5,
  //           propList: ['*']
  //         })
  //       ]
  //     }
  //   }
  // }
}
