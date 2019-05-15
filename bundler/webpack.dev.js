const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')

module.exports = webpackMerge(
    commonConfiguration,
    {
        mode: 'development',
        devServer:
        {
            contentBase: './dist',
            open: true,
            hot: true
        },
        plugins:
        [
            new webpack.HotModuleReplacementPlugin()
        ],
        module:
        {
            rules:
            [
                {
                    test: /\.css$/,
                    use:
                    [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.styl$/,
                    use:
                    [
                        'style-loader',
                        'css-loader',
                        'stylus-loader'
                    ]
                }
            ]
        }
    }
)
// module.exports = {
//     // mode : 'development',
//     devServer:
//     {
//         contentBase: './dist',
//         open: true,
//         hot: true
//         // port: 1234
//     },
//     devtool: 'source-map',
//     plugins:
//     [
//         new CleanWebpackPlugin(['dist'], { root: path.resolve(__dirname, '..') }),
//         new webpack.HotModuleReplacementPlugin(),
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, '../src/index.html')
//         })
//     ],
//     entry: './src/index.js',
//     output:
//     {
//         filename: 'bundle.[hash].js',
//         path: path.resolve(__dirname, '../dist')
//     },
//     module:
//     {
//         rules:
//         [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use:
//                 [
//                     'babel-loader'
//                 ]
//             },
//             {
//                 test: /\.css$/,
//                 use:
//                 [
//                     'style-loader',
//                     'css-loader'
//                 ]
//             },
//             {
//                 test: /\.(jpg|png|gif|svg)$/,
//                 use:
//                 [
//                     {
//                         loader: 'file-loader',
//                         options:
//                         {
//                             outputPath: 'images/'
//                         }
//                     }
//                 ]
//             },
//             {
//                 test: /\.(ttf|woff|woff2|eot|otf)$/,
//                 use:
//                 [
//                     {
//                         loader: 'file-loader',
//                         options:
//                         {
//                             outputPath: 'fonts/'
//                         }
//                     }
//                 ]
//             },
//             {
//                 test: /\.html$/,
//                 use:
//                 [
//                     'html-loader'
//                 ]
//             }
//         ]
//     }
// }