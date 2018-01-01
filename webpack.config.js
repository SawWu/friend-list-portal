const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/index.jsx'),
    },
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        publicPath: '/assets',
        filename: 'js/[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                }),
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                }),
            },
            {
                test: /\.js[x]?$/,
                use: [{
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015','stage-0'],
                    },
                }],
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx','.less'],
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'dist'),
        ],
    },
    devServer: {
        port: 8008,
        contentBase: path.join(__dirname, 'dist'),
        inline: true,
        compress: true,
        publicPath: '/assets',
        historyApiFallback: {
            index: '/assets/index.html'
        },
        open: true
    },
    plugins: [
        new ExtractTextPlugin('css/style.css'),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,                //正则匹配后缀.css文件;
            cssProcessor: require('cssnano'),            //加载‘cssnano’css优化插件;
            cssProcessorOptions: { discardComments: {removeAll: true } }, //插件设置,删除所有注释;
            canPrint: true                             //设置是否可以向控制台打日志,默认为true;
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/index.html',
            inject: 'body',
            minify:{
                removeComments:true,
                collapseWhitespace:true
            }
        }),
    ],
};