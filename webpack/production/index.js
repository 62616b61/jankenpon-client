import plugins from './plugins'
import loaders from './loaders'

export default (config) => ({
  devtool: 'hidden-source-map',
  devServer: {
    compress: true,
    inline: false,
    hot: false
  },

  module: { loaders },

  plugins

})
