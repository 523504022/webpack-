        //path内置的模块，用来设置路径。
        const {resolve} = require('path')
        // 自动创建一个index.html,并且引入应该引入的资源
        const HtmlWebpackPlugin = require('html-webpack-plugin')
        
        module.exports = {
            //入口（从哪里进入开始解析）
            entry:'./src/js/index.js',
        
            //出口（最终加工完的代码输出到哪里）
            output: {// 输出配置
            path:resolve(__dirname, '../build'),//输出文件路径配置
            filename: './js/index.js',// 输出文件名
          },
            //配置所有的loader   
            module: {
                rules: [
                // 处理图片,并根据大小转换base64
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                      {
                        loader: 'url-loader',
                        options: {
                            outputPath:'img',         //图片最终输出的位置
                            publicPath:'../img',		//css资源图片路径
                            name:'[hash:5].[ext]',     //修改图片名称
                            limit:8192                 //当图片小于8kb时,将图片变为base64编码
                        }
                      }
                    ]
                },
                // 对js进行语法检查
                {
                    test: /\.js$/, // 涵盖 .js 文件
                    enforce: "pre", // 预先加载好 jshint loader
                    exclude: /node_modules/, // 排除掉 node_modules 文件夹下的所有文件
                    use: [
                        {
                            loader: "jshint-loader",
                            options: {
                                //jslint 的错误信息在默认情况下会显示为 warning（警告）类信息
                                //将 emitErrors 参数设置为 true 可使错误显示为 error（错误）类信息
                                emitErrors: false,
                  
                                //jshint 默认情况下不会打断webpack编译
                                //如果你想在 jshint 出现错误时，立刻停止编译
                                //请设置 failOnHint 参数为true
                                failOnHint: false,
                                esversion: 6
                            }
                        }
                    ]
                },
                // 将es6转译es5
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['es2015']
              }
            }
                }
                ]
            },
            //配置所有的插件
            plugins: [
                // 自动创建一个index.html,并且引入应该引入的资源
                new HtmlWebpackPlugin({
                    title:"webpack",//指定html文档中的title标签
                    filename:"index.html",//指定生成文件名字
                    template:"./src/index.html"//生成文件所用模板
                   }),
            ]
        };