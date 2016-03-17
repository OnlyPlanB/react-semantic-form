var webpack = require('webpack');

module.exports = {
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
      { test :/\.js$/, exclude: /node_modules/, loader: 'babel', query: {
        presets: [ 'react', 'stage-0', 'es2015' ]
      }}
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}
