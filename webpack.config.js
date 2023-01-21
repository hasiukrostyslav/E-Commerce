const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/scripts/controller.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
    assetModuleFilename: 'assets/[name].[ext]',
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 3000,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.woff2?$|ttf/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].ext',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Createx',
      template: 'src/index.html',
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'catalog.html',
      title: 'Createx',
      template: 'src/catalog.html',
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'account.html',
      title: 'Createx',
      template: 'src/account.html',
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'blog-post.html',
      title: 'Createx',
      template: 'src/blog-post.html',
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'blog.html',
      title: 'Createx',
      template: 'src/blog.html',
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'checkout.html',
      title: 'Createx',
      template: 'src/checkout.html',
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'contact.html',
      title: 'Createx',
      template: 'src/contact.html',
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'faq.html',
      title: 'Createx',
      template: 'src/faq.html',
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'product.html',
      title: 'Createx',
      template: 'src/product.html',
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'store.html',
      title: 'Createx',
      template: 'src/store.html',
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'track.html',
      title: 'Createx',
      template: 'src/track.html',
      minify: false,
    }),
  ],
};
