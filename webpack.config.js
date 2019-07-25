const merge = require('webpack-merge');
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

const commonConfig = require('./webpack.common.config.js');

const publicConfig = {
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            // {
            //     test: /\.(css|scss|sass)$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: "style-loader!css-loader!sass-loader",
            //         use: "style-loader!css-loader!sass-loader"
            //     }),
            // },
            {
                test: /\.(css|scss|sass)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // new ExtractTextPlugin({
        //     filename: '[name].[contenthash:5].css',
        //     allChunks: true
        // })
    ]
};

module.exports = merge(commonConfig, publicConfig);
