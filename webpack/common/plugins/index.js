import webpack from 'webpack'
import path from 'path'

import HtmlWebpackPlugin from 'html-webpack-plugin'

export default (config) => [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor-[hash].js'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      RUNTIME: process.env.RUNTIME === 'raspi'
        ? '192.168.1.101:30303'
        : '35.198.154.33',
      IS_DEV: process.env.NODE_ENV !== 'production',
      NODE_ENV: JSON.stringify(config.nodeEnv),
    }
  }),
  new HtmlWebpackPlugin({
    template: path.join(config.sourcePath, 'index.html'),
    path: config.buildPath,
    filename: 'index.html'
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
]
