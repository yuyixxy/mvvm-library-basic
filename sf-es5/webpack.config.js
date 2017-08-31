const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bound.js',
        path: path.resolve(__dirname, 'build')
    },
    devtool: 'source-map',
    module: {},
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My MVVM App',
            template: './index.html',
            filename: 'index.html',
            inject: true
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        compress: true, // 使用gzip
        port: 18080
    }
};