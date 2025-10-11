const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 📦 Punto de entrada principal
  entry: './src/assets/main.js',

  // 📤 Salida compilada
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // limpia la carpeta dist antes de compilar
  },

  // ⚙️ Reglas de carga
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/pokemon-card-component'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },

  // 🧩 Plugins
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'body' 
    }),
  ],

  // 🧰 Servidor local
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
    hot: true,
  },

  // 🏗️ Siempre en modo producción (una sola build)
  mode: 'production',

  // 🧠 Mapa de código para depurar (útil incluso en prod)
  devtool: 'source-map',
};
