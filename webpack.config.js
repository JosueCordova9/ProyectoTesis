const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        customapp: './src/customapp.jsx'
    },
    module: {
        rules: [
            {test: /\.(js|jsx)$/, use: ['babel-loader']},
            {test: /\.(css)$/, use: ['style-loader','css-loader']},
            {test: /\.(png|jpg|gif)$/, use: [{loader: 'file-loader'}]},
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            title: 'DECE',
            template: './src/template.ejs',
            filename: 'DECE.html',
            chunks: ['customapp']
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devtool: 'inline-source-map'
}