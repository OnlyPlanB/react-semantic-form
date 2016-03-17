var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',

  output: {
    library: 'ReactBootstrapForm',
    libraryTarget: 'umd'
  },

  externals: [
    {
      react: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  ],

  module: {
    loaders: [
      { test :/\.js$/, exclude: /node_modules/, loader: 'babel' }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}
