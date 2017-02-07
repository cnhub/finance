var webpack = require('webpack');
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var htmlWebpackPlugin = require('html-webpack-plugin');

//编译完，启动浏览器
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

//提取通用部分
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin({ chunks: ['vendors'], filename: 'vendors.min.js' })

//挂载到全局
var providePlugin = new webpack.ProvidePlugin({ React: 'react', ReactDOM: 'react-dom' });

var config = {
    //页面入口文件配置
    entry: {
        main: [
            path.join(__dirname, './app.jsx')
        ],
        vendors: ['react', 'react-dom']
    },
    //入口文件输出配置
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: '[name].min.js'
    },
    module: {
        //加载器配置
        rules: [{
            test: /\.jsx?$/,
            use: ['babel-loader'],
            exclude: /(node_modules|bower_components)/
        }, {
            test: /\.less/,
            use: ['style-loader', 'css-loader', 'less-loader', {
                loader: 'postcss-loader',
                options: {
                    plugins: function() {
                        return [
                            require('rucksack-css'),
                            require('autoprefixer')({ browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 9'] }),
                        ];
                    }
                }
            }]
        }, {
            test: /\.css/,
            use: ['style-loader', 'css-loader?modules', {
                loader: 'postcss-loader',
                options: {
                    plugins: function() {
                        return [
                            require('rucksack-css'),
                            require('autoprefixer')({ browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 9'] }),
                        ];
                    }
                }
            }]
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'images/[name].[ext]?[hash]'
                }
            }]
        }, {
            test: /\.json$/,
            use: [{
                loader: `${require.resolve('json-loader')}`
            }]
        }, {
            test: /\.html?$/,
            use: [{
                loader: `${require.resolve('file-loader')}`,
                options: {
                    name: '[name].[ext]'
                }
            }]
        }]
    },
    //插件项
    plugins: [
        providePlugin,
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        //变量定义
        //js压缩
        new webpack.optimize.UglifyJsPlugin({
            screw_ie8: true,
            sourceMap: false,
            mangle: false,
            comments: false,
            compress: {
                warnings: false,
                drop_console: true
            },
            mangle: {
                except: ['$super', '$', 'exports', 'require']
            }
        }),
        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates

        new webpack.NoEmitOnErrorsPlugin(),
        //报错但不退出webpack进程
        
        new htmlWebpackPlugin({
            // title: '',
            template: path.resolve(__dirname, 'template.ejs'),
            filename: 'index.html',
            //chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: [
                'vendors', 'main'
            ],
            hash: true,
            // inject: 'body',
            minify: {}
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:8080/' })
    ],
    resolve: {
        // modules: [
        //     "node_modules",
        //     path.resolve(__dirname)
        // ],
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.less',
            '.css',
            '.png',
            '.jpg'
        ],
        //别名
        alias: {}
    },
    //监视变化
    // watch: true,
    // 启用source-map
    devtool: 'source-map',
    target: 'web'
};

module.exports = config;
