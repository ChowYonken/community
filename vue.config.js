module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8090',
        changeOrigin: true,
      } 
    },   
    public: '192.168.101.16',
    port: 8090
    // public: '192.168.20.44'
    // public: '172.20.10.5'
  },
  publicPath: '/',
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