const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist'
  },
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: false,
    port: 3000,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_mdules/
      }
    ]
  },
  resolve: {
    extensions:  ['.js', '.ts']
  }
}