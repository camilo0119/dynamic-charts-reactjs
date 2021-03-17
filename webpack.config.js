const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'charts.js'
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    module: {
        rules: [
            {
                test: /\.js$|jsx/,
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                },
                loader: 'babel-loader'
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    'css-loader',
                    'sass-loader'
                ],
            },
        ]
    },
    plugins: [
        new htmlPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "assets/charts.css",
        }),
    ]
}