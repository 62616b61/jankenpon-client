export default {
  test: /\.(jpe?g|png|gif)$/i,
  use: [{
    loader: 'file-loader',
    options: {
      hash: 'sha512',
      digest: 'hex',
      name: 'images/[name]-[hash].[ext]'
    }
  }]
}
