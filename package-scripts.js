const npsUtils = require('nps-utils')

const { rimraf, crossEnv, series } = npsUtils

module.exports = {
  scripts: {
    build: {
      default: series.nps('clean', 'build.build'),
      build: `${crossEnv('NODE_ENV=production')} webpack --config ./webpack/webpack.config.babel.js`
    },
    clean: {
      default: rimraf('dist')
    },
    default: {
      script: `${crossEnv('NODE_ENV=production')} serve -p ${process.env.PORT} dist`
    },
    dev: {
      default: 'webpack-dev-server --config ./webpack/webpack.config.babel.js'
    }
  }
}
