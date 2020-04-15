const path = require('path')

module.exports = {
  // publicPath: process.env.VUE_APP_BUILD_MODE === 'PROD' ? 'http://cdn_static_root/' : '.',
  outputDir: 'dist',
  // assetsDir: 'static',
  filenameHashing: true,
  // 线上环去除sourcemap
  productionSourceMap: false,
  chainWebpack: config => {
    // 路径别名
    config.resolve.alias.set('@', path.resolve(__dirname, './src'))
    // 自定义标题
    config.plugin('html').tap((args) => {
      args[0].title = 'demo测试'
      return args
    })
    /*
      if there're dependencies installed by npm link or yarn link, ESLint (and sometimes Babel as well) may not work properly for those symlinked dependencies
      中文文档没有同步，深坑。
    */
    // config.resolve.symlinks(false)
  },
  devServer: {
    // proxy: {
    //   '/api/*': {
    //     target: '',
    //     changeOrigin: true
    //   }
    // }
  }
}
