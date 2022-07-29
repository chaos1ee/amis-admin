const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./config')

module.exports = function (env) {
  const isEnvDevelopment = env.hasOwnProperty('development')
  const isEnvProduction = env.hasOwnProperty('production')

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment ? 'development' : 'none',
    entry: './src/main.js',
    resolve: {
      extensions: ['.js', '.mjs'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isEnvProduction ? 'assets/[name].[contenthash:8].js' : isEnvDevelopment && 'assets/[name].bundle.js',
      chunkFilename: isEnvProduction
        ? 'assets/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'assets/[name].chunk.js',
      assetModuleFilename: 'assets/[name].[hash][ext]',
      clean: true,
    },
    devtool: isEnvDevelopment ? 'inline-source-map' : 'source-map',
    devServer: {
      static: path.resolve(__dirname, 'public'),
      port: 4000,
      hot: true,
      open: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: config.APP_TITLE,
        template: path.resolve(__dirname, 'index.html'),
      }),
      isEnvProduction &&
        new MiniCssExtractPlugin({
          filename: 'assets/[name].[contenthash:8].css',
          chunkFilename: 'assets/[name].[contenthash:8].chunk.css',
        }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public',
            globOptions: {
              ignore: ['**/mockServiceWorker.js'],
            },
          },
        ],
        options: {
          concurrency: 100,
        },
      }),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/i,
          use: [
            isEnvDevelopment && require.resolve('style-loader'),
            isEnvProduction && {
              loader: MiniCssExtractPlugin.loader,
              options: {},
            },
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                sourceMap: true,
              },
            },
          ].filter(Boolean),
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [new CssMinimizerPlugin()],
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    experiments: {
      topLevelAwait: true,
    },
  }
}
