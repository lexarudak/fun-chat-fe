const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts', // Одна точка входа
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    static: './dist',
    historyApiFallback: true,
    hot: false, // Отключить HMR
    liveReload: false, // Отключить Live Reload
    client: {
      overlay: false, // Отключить Overlay
      // Удалите webSocketURL, он не требуется
    },
  },
  devtool: false, // Полностью отключить source maps
  mode: 'development',
};