import webpack from 'webpack'

export default [
  new webpack.SourceMapDevToolPlugin({ filename: null, test: /\.jsx?$/ }),
  new webpack.HotModuleReplacementPlugin()
]
