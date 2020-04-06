const path = require('path'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

const distDir = path.resolve(__dirname, 'dist'),
  srcDir = path.resolve(__dirname, 'src'),
  viewDir = path.resolve(srcDir, 'view');

const IS_DEV = process.env.NODE_ENV === 'development';
const MODE = IS_DEV ? 'development' : 'production';

module.exports = {
  target: 'web',
  mode: MODE,
  entry: {
    index: path.resolve(viewDir, 'index.js')
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[id].js',
    path: distDir
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'svelte-loader',
            options: {
              emitCss: !IS_DEV,
              hotReload: IS_DEV,
              preprocess: require('./svelte.config.js').preprocess
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          { loader: IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: IS_DEV ? 'expanded' : 'compressed',
                precision: 8,
                includePaths: [path.resolve(srcDir, 'styles')]
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(srcDir, 'components'),
      svelte: path.resolve(__dirname, 'node_modules', 'svelte')
    },
    extensions: ['.js', '.ts', '.scss', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
    modules: ['node_modules'],
    plugins: [new DirectoryNamedWebpackPlugin(true)]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      title: 'Svelte App',
      chunks: ['index'],
      filename: 'index.html',
      template: path.resolve(viewDir, 'index.html')
    })
  ],
  watchOptions: {
    ignored: /node_modules/
  },
  devtool: IS_DEV ? 'cheap-module-eval-source-map' : 'source-map',
  devServer: {
    contentBase: distDir,
    compress: true,
    port: 8080
  }
};
