import plugins from './plugins'
import loaders from './loaders'

export default (config) => ({
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    compress: false,
    inline: true,
    hot: true
  },

  module: { loaders },

  plugins

})
