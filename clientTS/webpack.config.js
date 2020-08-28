const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pfDir = path.dirname(require.resolve('@patternfly/patternfly/package.json'));
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// Don't include PatternFly styles twice
module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: './src/Bootstrap/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash:8].bundle.js'
    },
    devServer: {
      historyApiFallback: true,
      port: 8003
    },
    optimization: {
      minimize: isProd ? true : false,
      runtimeChunk: 'single',
    },
    devtool: isProd ? 'source-map' : 'cheap-module-source-map',
    resolve: {
      extensions
    },
    module: {
      rules: [
        {
          test: /\.[tj]sx?$/,
          include: [
            path.resolve(__dirname, 'src')
          ],
          use: {
            loader: 'ts-loader',
          },
        },
        {
          test: /\.(css|s[ca]ss)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isProd
              },
            },
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                fallback: 'file-loader',
                name: '[name]-[contenthash:5].[ext]',
                outputPath: 'images/'
              },
            }
          ]
        },
        {
          test: /.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].css',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': isProd ? "'production'" : "'development'"
      }),
      new CopyPlugin({
        patterns: [
          { from: path.join(pfDir, 'assets/images/'), to: 'assets/images/' },
          { from: path.join(pfDir, 'assets/fonts/'), to: 'assets/fonts/' },
          { from: path.join(__dirname, 'public/'), to: '' },
        ]
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new webpack.NormalModuleReplacementPlugin(
        /View.carbon/,
        resource => {
          if (process.env.cl === 'PATTERNFLY') {
            resource.request = resource.request.replace('carbon', 'patternfly');
          }
        }
      ),
      ...(isProd
        ? [
          new webpack.HashedModuleIdsPlugin(), // Hashes based on module content
          new CleanWebpackPlugin(),
          ...(env === 'analyze' ? [new BundleAnalyzerPlugin()] : []) // webpack --env analyze
        ]
        : [
          // new ReactRefreshWebpackPlugin()
        ]
      ),
    ],
    resolve: {
      alias: {
        Elements: path.resolve(__dirname, './src/Elements'),
        Groups: path.resolve(__dirname, './src/Groups'),
        Hooks: path.resolve(__dirname, './src/Hooks'),
        Utils: path.resolve(__dirname, './src/Utils')
      },
      extensions
    },
    stats: isProd ? 'normal' : 'minimal'
  };
}
