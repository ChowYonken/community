module.exports = {
  devServer: {
    proxy:'http://localhost:8080',
    public: '192.168.101.16'
  },
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}