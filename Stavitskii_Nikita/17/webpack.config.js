const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    devtool: 'eval-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            components: path.resolve(__dirname, 'src', 'components'),
            pages: path.resolve(__dirname, 'src', 'pages'),
            actions: path.resolve(__dirname, 'src', 'actions'),
            containers: path.resolve(__dirname, 'src', 'containers'),
            reducers: path.resolve(__dirname, 'src', 'reducers'),
            middleware: path.resolve(__dirname, 'src', 'middleware'),
        },
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            }
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css',
        }),
        new CopyPlugin([
            {from: path.resolve(__dirname, 'api'), to: path.resolve(__dirname, 'dist', 'api')},
            {from: path.resolve(__dirname, 'src', 'sw.js'), to: path.resolve(__dirname, 'dist')},
            {from: path.resolve(__dirname, 'src', 'manifest.json'), to: path.resolve(__dirname, 'dist')},
            {from: path.resolve(__dirname, 'src', 'assets', 'images'), to: path.resolve(__dirname, 'dist', 'images')},
            ]
        )
    ],
    devServer: {
        historyApiFallback: true, //Чтобы все запросы направлялись на 1 страницу
    },
};