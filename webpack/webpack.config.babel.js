import merge from 'webpack-merge'
import { join } from 'path'

import commonWebpackConfig from './common'
import productionWebpackConfig from './production'
import developmentWebpackConfig from './development'

const config = {
  jsSourcePath: join(process.cwd(), './src/js'),
  assetsPath: join(process.cwd(), './src/assets'),
  buildPath: join(process.cwd(), './dist'),
  sourcePath: join(process.cwd(), './src'),
  nodeEnv: process.env.NODE_ENV || 'development'
}

let webpackConfig
switch (config.nodeEnv) {
  case 'production':
    webpackConfig = productionWebpackConfig
    break
  case 'development':
  default:
    webpackConfig = developmentWebpackConfig
    break
}

export default merge.smart(commonWebpackConfig(config), webpackConfig(config))
