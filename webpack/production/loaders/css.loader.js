export default {
  test: /\.(css)$/,
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        localIdentName: '[local]--[hash:base64:5]',
        camelCase: true
      }
    }
  ],
  exclude: /node_modules/
}
