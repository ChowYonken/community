module.exports = {
  devServer: {
    proxy:'http://localhost:8080',
    public: '192.168.101.16'
    // public: '192.168.20.44'
    // public: '172.20.10.5'
  },
  configureWebpack: {
    devtool: 'inline-source-map',
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