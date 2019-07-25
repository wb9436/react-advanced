# Webpack的[中文文档](https://webpack.docschina.org/)

# init项目
1.创建文件夹并进入 

    mkdir react-advanced && cd react-advanced

2.init npm
        
    npm init 按照提示填写项目基本信息

# webpack 
1.安装`webpack`

    npm install --save-dev webpack@3
   
    Q:什么时候用--save-dev，什么时候用--save?
    A:--save-dev 是开发时候依赖的东西，--save是你发布之后还依赖的东西。

2.根据webpack文档编写最基础的配置文件，新建webpack开发配置文件webpack.dev.config.js
    
    const path = require('path');
    module.exports = {
        /*入口*/
        entry: path.join(__dirname, 'src/index.js'),
        
        /*输出到dist文件夹，输出文件名字为bundle.js*/
        output: {
            path: path.join(__dirname, './dist'),
            filename: 'bundle.js'
        }
    };

3.使用webpack编译文件

    mkdir src && touch ./src/index.js
    
    src/index.js 添加内容
    
    document.getElementById('app').innerHTML = "Webpack works"
    
    现在我们执行命令 webpack --config webpack.dev.config.js
    
4.现在开始测试

    dist文件夹下面新建一个index.html
    dist/index.html填写内容
    
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
    </head>
    <body>
    <div id="app"></div>
    <script type="text/javascript" src="./bundle.js" charset="utf-8"></script>
    </body>
    </html>

# babel：
###### babel 把用最新标准编写的 JavaScript 代码向下编译成可以在今天随处可用的版本。 这一过程叫做“源码到源码”编译， 也被称为转换编译。

+ babel-cord 调用Babel的Api进行转码
+ babel-loader
+ babel-preset-es2015 用于解析ES6
+ babel-preset-react 用于解析JSX
+ babel-preset-stage-0 用于解析ES7提案

`npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0`

    Q: babel-preset-state-0,babel-preset-state-1,babel-preset-state-2,babel-preset-state-3有什么区别？
    
    A: 每一级包含上一级的功能，比如 state-0包含state-1的功能，以此类推。state-0功能最全。具体可以看这篇文章：babel配置-各阶段的stage的区别
        

# React

1. 安装react，`npm install --save react react-dom`    

# React-router

1. 安装react-router，`npm install --save react-router-dom`

2. 新建router文件
    ```
        import React from 'react';
        import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
        import Home from '../pages/Home/Home';
        import Page1 from '../pages/Page1/Page1';
        const getRouter = () => (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">首页</Link></li>
                        <li><Link to="/page1">Page1</Link></li>
                    </ul>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/page1" component={Page1}/>
                    </Switch>
                </div>
            </Router>
        );
        export default getRouter;
    ```

3. 修改入口文件src/index.js，引用Router

    ```
        import React from 'react';
        import ReactDom from 'react-dom';
        
        import getRouter from './router/router';
        
        ReactDom.render(
            getRouter(), document.getElementById('app'));
    ```
    
# webpack-dev-server
###### 简单来说，webpack-dev-server就是一个小型的静态文件服务器。使用它，可以为webpack打包生成的资源文件提供Web服务。
    
1. 安装webpack-dev-server，`npm install webpack-dev-server@2 --save-dev`
    
2. 修改webpack.dev.config.js文件，增加webpack-dev-server配置

    ```
        devServer: {
            contentBase: path.join(__dirname, './dist')
        }
    ```

    Q: --content-base是什么？
    A：URL的根目录。如果不设定的话，默认指向项目根目录。
    
3. webpack-dev-server常用配置
    
    * color（CLI only） console中打印彩色日志
    
    * historyApiFallback 任意的404响应都被替代为index.html。有什么用呢？你现在运行
      npm start，然后打开浏览器，访问http://localhost:8080,然后点击Page1到链接http://localhost:8080/page1，
      然后刷新页面试试。是不是发现刷新后404了。为什么？dist文件夹里面并没有page1.html,当然会404了，所以我们需要配置
      historyApiFallback，让所有的404定位到index.html。
    
    * host 指定一个host,默认是localhost。如果你希望服务器外部可以访问，指定如下：host: "0.0.0.0"。比如你用手机通过IP访问。
    
    * hot 启用Webpack的模块热替换特性。关于热模块替换，我下一小节专门讲解一下。
    
    * port 配置要监听的端口。默认就是我们现在使用的8080端口。
    
    * proxy 代理。比如在 localhost:3000 上有后端服务的话，你可以这样启用代理：
    
    * progress（CLI only） 将编译进度输出到控制台。
    
    **CLI ONLY的需要在命令行中配置，修改配置如下**
    
    1. webpack.dev.config.js
    ```
        devServer: {
            port: 10010,
            contentBase: path.join(__dirname, './dist'),
            historyApiFallback: true,
            host: '192.168.1.166
        }
    ```
    2. package.json
    ```angular2html
       "dev-start": "webpack-dev-server --config webpack.dev.config.js --color --progress"
    ```

# 模块热替换（Hot Module Replacement）

1. package 增加 `--hot`
    
    "dev-start": "webpack-dev-server --config webpack.dev.config.js --color --progress --hot"

2. 入口文件增加 `module.hot.accept()`，如下。当模块更新时通知index.js

    ```
        import React from 'react';
        import ReactDom from 'react-dom';
        
        import getRouter from './router/router';
        
        if (module.hot) {
            module.hot.accept();
        }
        
        ReactDom.render(
            getRouter(), document.getElementById('app'));  
    ```
3. 现在我需要说明下我们命令行使用的--hot，可以通过配置webpack.dev.config.js来替换，
   向文档上那样,修改下面三处
    
   ```
        const webpack = require('webpack');
        
        devServer: {
            hot: true
        }
        
        plugins:[
             new webpack.HotModuleReplacementPlugin()
        ]
   ```

4. 为保证react模块更新时，能保留state等状态引入 react-hot-loader
###### Q: 请问webpack-dev-server与react-hot-loader两者的热替换有什么区别？
###### A: 区别在于webpack-dev-server自己的--hot模式只能即时刷新页面，但状态保存不住。因为React有一些自己语法(JSX)是HotModuleReplacementPlugin搞不定的。

1. 安装react-hot-loader，`npm install react-hot-loader@next --save-dev`

2. 修改.babelrc 文件，增加 react-hot-loader/babel配置
    ```
        {
          "presets": [
            "es2015",
            "react",
            "stage-0"
          ],
          "plugins": [
            "react-hot-loader/babel"
          ]
        }
    ```

3. webpack.dev.config.js入口增加react-hot-loader/patch

    ```
        entry: [
            'react-hot-loader/patch',
            path.join(__dirname, 'src/index.js')
        ]
    ```

4. 入口文件src/index.js 修改如下

   ```
        import React from 'react';
        import ReactDom from 'react-dom';
        import {AppContainer} from 'react-hot-loader';
        
        import getRouter from './router/router';
        
        /*初始化*/
        renderWithHotReload(getRouter());
        
        /*热更新*/
        if (module.hot) {
            module.hot.accept('./router/router', () => {
                const getRouter = require('./router/router').default;
                renderWithHotReload(getRouter());
            });
        }
        
        function renderWithHotReload(RootElement) {
            ReactDom.render(
                <AppContainer>
                    {RootElement}
                </AppContainer>,
                document.getElementById('app')
            )
        }
   ```

# 文件路径优化
###### 在之前写的代码中，我们引用组件，或者页面时候，写的是相对路径~ 比如src/router/router.js里面，引用Home.js的时候就用的相对路径

1.修改webpack.dev.config.js，增加别名

```
    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router')
        }
    }
```

# Redux 状态管理
###### 容器组件就是使用 store.subscribe() 从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。你可以手工来开发容器组件，但建议使用 React Redux 库的 connect() 方法来生成，这个方法做了性能优化来避免很多不必要的重复渲染。
###### connect接收两个参数，一个mapStateToProps,就是把redux的state，转为组件的Props，还有一个参数是mapDispatchToprops，就是把发射actions的方法，转为Props属性函数。
###### 所有容器组件都可以访问 Redux store，所以可以手动监听它。一种方式是把它以 props 的形式传入到所有容器组件中。但这太麻烦了，因为必须要用 store 把展示组件包裹一层，仅仅是因为恰好在组件树中渲染了一个容器组件。
###### 建议的方式是使用指定的 React Redux 组件 来 魔法般的 让所有容器组件都可以访问 store，而不必显示地传递它。只需要在渲染根组件时使用即可。

1. 安装redux，`npm install --save redux`

2. 安装react-redux，`npm install --save react-redux`，react-redux提供了一个方法connect

3. 传入store

    ```
        import React from 'react';
        import ReactDom from 'react-dom';
        import {AppContainer} from 'react-hot-loader';
        import {Provider} from 'react-redux';
        import store from './redux/store';
        
        import getRouter from 'router/router';
        
        /*初始化*/
        renderWithHotReload(getRouter());
        
        /*热更新*/
        if (module.hot) {
            module.hot.accept('./router/router', () => {
                const getRouter = require('router/router').default;
                renderWithHotReload(getRouter());
            });
        }
        
        function renderWithHotReload(RootElement) {
            ReactDom.render(
                <AppContainer>
                    <Provider store={store}>
                        {RootElement}
                    </Provider>
                </AppContainer>,
                document.getElementById('app')
            )
        }
    ```

4. [React 实践心得：react-redux 之 connect 方法详解](http://taobaofed.org/blog/2016/08/18/react-redux-connect/)

    1. Provider组件是让所有的组件可以访问到store。不用手动去传。也不用手动去监听。

    2. connect函数作用是从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。也传递dispatch(action)函数到props。

5. 异步Action，参考地址：[http://cn.redux.js.org/docs/advanced/AsyncActions.html](http://cn.redux.js.org/docs/advanced/AsyncActions.html)
   
    1. 请求开始的时候，界面转圈提示正在加载。isLoading置为true。
    2. 请求成功，显示数据。isLoading置为false,data填充数据。
    3. 请求失败，显示失败。isLoading置为false，显示错误信息。

6. 为了让action创建函数除了返回action对象外，还可以返回函数，需要引用redux-thunk。`npm install --save redux-thunk`

# 编译CSS

1. 使用css

    1. 安装依赖 `npm install css-loader style-loader --save-dev`
    
    2. webpack.dev.config.js rules 增加
    
        ```
        {
           test: /\.css$/,
           use: ['style-loader', 'css-loader']
        }
        ```

2. 使用SCSS

    1. 安装依赖，`npm install node-sass sass-loader --save-dev`
    
    2. webpack.dev.config.js rules 增加
    
        ```
        {
            test: /\.(scss|sass)$/,
            use: ['style-loader', 'sass-loader']
        }
        ```

# 图片编译

1. 安装依赖：`npm install url-loader file-loader --save-dev`
    
2. 增加webpack.dev.config.js rules配置

    ```
    {
        test: /\.(png|jpg|gif)$/,
        use: [{
            loader: 'url-loader',
            options: {
                limit: 8192 //options limit 8192意思是，小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求。
            }
        }]
    }
    ```

# 按需加载

1. 为什么要实现按需加载？
    
    1. 我们现在看到，打包完后，所有页面只生成了一个build.js,当我们首屏加载的时候，就会很慢。因为他也下载了别的页面的js了哦。
      
    2. 如果每个页面都打包了自己单独的JS，在进入自己页面的时候才加载对应的js，那首屏加载就会快很多哦。
      
    3. 在 react-router 2.0时代， 按需加载需要用到的最关键的一个函数，就是require.ensure()，它是按需加载能够实现的核心。
      
    4. 在4.0版本，官方放弃了这种处理按需加载的方式，选择了一个更加简洁的处理方式。

2. [官方文档](https://reacttraining.com/react-router/web/guides/code-splitting)

3. 安装依赖：`npm install bundle-loader --save-dev`    

4. 新建src/router/Bundle.js 文件

    ```
    import React, {Component} from 'react'
    
    class Bundle extends Component {
        state = {
            // short for "module" but that's a keyword in js, so "mod"
            mod: null
        };
    
        componentWillMount() {
            this.load(this.props)
        }
    
        componentWillReceiveProps(nextProps) {
            if (nextProps.load !== this.props.load) {
                this.load(nextProps)
            }
        }
    
        load(props) {
            this.setState({
                mod: null
            });
            props.load((mod) => {
                this.setState({
                    // handle both es imports and cjs
                    mod: mod.default ? mod.default : mod
                })
            })
        }
    
        render() {
            return this.props.children(this.state.mod)
        }
    }
    
    export default Bundle;
    ```

5. 改造路由器

    ```
    import React from 'react';
    
    import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
    
    import Bundle from './Bundle';
    
    import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
    import Page1 from 'bundle-loader?lazy&name=page1!pages/Page1/Page1';
    import Counter from 'bundle-loader?lazy&name=counter!pages/Counter/Counter';
    import UserInfo from 'bundle-loader?lazy&name=userInfo!pages/UserInfo/UserInfo';
    
    const Loading = function () {
        return <div>Loading...</div>
    };
    
    const createComponent = (component) => (props) => (
        <Bundle load={component}>
            {
                (Component) => Component ? <Component {...props} /> : <Loading/>
            }
        </Bundle>
    );
    
    const getRouter = () => (
        <Router>
            <div>
                <ul>
                    <li><Link to="/">首页</Link></li>
                    <li><Link to="/page1">Page1</Link></li>
                    <li><Link to="/counter">Counter</Link></li>
                    <li><Link to="/userinfo">UserInfo</Link></li>
                </ul>
                <Switch>
                    <Route exact path="/" component={createComponent(Home)}/>
                    <Route path="/page1" component={createComponent(Page1)}/>
                    <Route path="/counter" component={createComponent(Counter)}/>
                    <Route path="/userinfo" component={createComponent(UserInfo)}/>
                </Switch>
            </div>
        </Router>
    );
    
    export default getRouter;
    ```

# 处理缓存问题

1. 修改webpack.dev.config.js文件
    
    ```
    output: {
            path: path.join(__dirname, './dist'),
            filename: '[name].[hash].js',
            chunkFilename: '[name].[chunkhash].js'
        }
    ```

2. 上述处理会导致，发布项目时需要手动修改`index.html`文件，使用`HtmlWebpackPlugin`自动将js插入`index.html`模板
    
    1. 安装`HtmlWebpackPlugin`，`npm install html-webpack-plugin --save-dev`

    2. 修改`webpack.dev.config.js`文件，增加plugin
    
    ```
      var HtmlWebpackPlugin = require('html-webpack-plugin');
      
          plugins: [new HtmlWebpackPlugin({
              filename: 'index.html',
              template: path.join(__dirname, 'src/index.html')
          })],
    ```
    
3. 提取公共代码，因常用依赖`react,redux,react-router`基本不会改变，每次发布无需重新请求        
    
    1. webpack提供[教程](https://webpack.docschina.org/guides/caching#-extracting-boilerplate-)
    
    2. 修改webpack.dev.config.js
            
        ```
        var webpack = require('webpack');
        
        entry: {
            app: [
                'react-hot-loader/patch',
                path.join(__dirname, 'src/index.js')
            ],
            vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
        }
        
        /*plugins*/
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })   
        ```    
    3. 修改output,但是无奈，如果用chunkhash，会报错。和webpack-dev-server --hot不兼容。
    
        ```
        output: {
            path: path.join(__dirname, './dist'),
            filename: '[name].[hash].js', //这里应该用chunkhash替换hash
            chunkFilename: '[name].[chunkhash].js'
        }
        ```
    
# 生产坏境构建
###### 开发环境(development)和生产环境(production)的构建目标差异很大。在开发环境中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置。

1. 新增webpack.config.js
    ```
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const webpack = require('webpack');
    
    module.exports = {
        devtool: 'cheap-module-source-map',
        entry: {
            app: [
                path.join(__dirname, 'src/index.js')
            ],
            vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
        },
        output: {
            path: path.join(__dirname, './dist'),
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name].[chunkhash].js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: ['babel-loader'],
                    include: path.join(__dirname, 'src')
                },
                {
                    test: /\.(css|scss|sass)$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.join(__dirname, 'src/index.html')
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
            })
        ],
        resolve: {
            alias: {
                pages: path.join(__dirname, 'src/pages'),
                components: path.join(__dirname, 'src/components'),
                router: path.join(__dirname, 'src/router')
            }
        }
    };
    
    ```

2. 修改package.json的`scripts` 配置，增加打包脚本
    
    `"build":"webpack --config webpack.config.js"`

3. 文件压缩，webpack使用UglifyJSPlugin来压缩生成的文件。

    1. 安装依赖 `npm install --save-dev uglifyjs-webpack-plugin`

    2. 修改webpack.config.js文件
        
        ```
        const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
        
        module.exports = {
          plugins: [
            new UglifyJSPlugin()
          ]
        }
        ```
    
    3. 运行 `npm run build` 报错，调整`webpack` `UglifyJSPlugin`配置
    
        ```
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"production"'}
        })
        
        ```

# 指定环境
###### 许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容。例如，当不处于生产环境中时，某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。其实，当使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。我们可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量：
    
    ```
    module.exports = {
      plugins: [
           new webpack.DefinePlugin({
              'process.env': {
                  'NODE_ENV': JSON.stringify('production')
               }
           })
      ]
    }
    ```

# 缓存优化
###### 刚才我们把[name].[hash].js变成[name].[chunkhash].js后，npm run build后，发现app.xxx.js和vendor.xxx.js不一样,你随便修改代码一处，例如Home.js，随便改变个字，你发现home.xxx.js名字变化的同时，vendor.xxx.js名字也变了。
###### 这不行啊。这和没拆分不是一样一样了吗？我们本意是vendor.xxx.js，名字永久不变，一直缓存在用户本地的
###### [官方文档](https://webpack.docschina.org/guides/caching)推荐了一个插件[HashedModuleIdsPlugin](https://webpack.docschina.org/plugins/hashed-module-ids-plugin)

    1.修改插件配置    
        ```
            plugins: [
                new webpack.HashedModuleIdsPlugin()
            ]
        ```
    
    2. 现在你打包，修改代码再试试，是不是名字不变啦？错了，现在打包，我发现名字还是变了，经过比对文档，我发现还要加一个runtime代码抽取，
        ```
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
        ```    
# public path
###### 想象一个场景，我们的静态文件放在了单独的静态服务器上去了，那我们打包的时候，如何让静态文件的链接定位到静态服务器呢？
###### 看下文档[Public Path](https://webpack.docschina.org/guides/public-path) 

###### webpack.config.js output 中增加一个publicPath，我们当前用/，相对于当前路径，如果你要改成别的url，就改这里就好了。

```
    output: {
        publicPath : '/'
    }
```

# 打包优化
###### 希望每次打包前自动清理下dist文件

1. 安装依赖，`npm install clean-webpack-plugin --save-dev`

2. 修改webpack.config.js文件
    
    ```
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ]
    ```

3. 上述配置编译报错，新版本clean-webpack.plugin配置方式不同老版本
    
    ```
    const {CleanWebpackPlugin} = require('clean-webpack-plugin');
   
    plugins: [
         new CleanWebpackPlugin()
    ]
    ```

# 抽取css
###### 目前我们的css是直接打包进js里面的，我们希望能单独生成css文件。

1. 使用[extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)实现

    1. 安装依赖，`npm install --save-dev extract-text-webpack-plugin`

    2. 修改webpack.config.js配置(存在问题)
    
        ```
        const ExtractTextPlugin = require("extract-text-webpack-plugin");
        
        module.exports = {
          module: {
            rules: [
              {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
                })
              }
            ]
          },
          plugins: [
             new ExtractTextPlugin({
                 filename: '[name].[contenthash:5].css',
                 allChunks: true
             })
          ]
        }
            
        ```

# 使用 `axios` 和 `middleware` 优化网络请求

1. 安装依赖 `npm install --save axios`

# 合并提取`webpack`公共配置

1. 使用`webpack-merge`合并公共配置和单独配置，安装依赖：`npm install --save-dev webpack-merge`
    
2. 替换前`webpack.dev.config.js`配置
    
    ```
    module.exports = {
        /*入口*/
        entry: {
            app: [
                'react-hot-loader/patch',
                path.join(__dirname, 'src/index.js')
            ],
            vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
        },
        devtool: 'inline-source-map',
        /*输出到dist文件夹，输出文件名字为bundle.js*/
        output: {
            path: path.join(__dirname, './dist'),
            filename: '[name].[hash].js', //这里应该用chunkhash替换hash
            chunkFilename: '[name].[chunkhash].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.join(__dirname, 'src/index.html')
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
            })
        ],
        // plugins:[
        //     new webpack.HotModuleReplacementPlugin()
        // ],
        /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
        /*cacheDirectory是用来缓存编译结果，下次编译加速*/
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: ['babel-loader'],
                    include: path.join(__dirname, 'src')
                },
                {
                    test: /\.(css|scss|sass)$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }]
                }
            ]
        },
        resolve: {
            alias: {
                pages: path.join(__dirname, 'src/pages'),
                components: path.join(__dirname, 'src/components'),
                router: path.join(__dirname, 'src/router')
            }
        },
        devServer: {
            port: 10010,
            contentBase: path.join(__dirname, './dist'),
            historyApiFallback: true,
            host: '192.168.1.166',
            hot: true
        }
    };
    
    ```    

3. 替换后`webpack.dev.config.js`配置

    ```
    const merge = require('webpack-merge');
    const path = require('path');
    const webpack = require('webpack')
    
    const commonConfig = require('./webpack.common.config.js');
    
    
    const devConfig = {
        devtool: 'inline-source-map',
        /*入口*/
        entry: {
            app: [
                'react-hot-loader/patch',
                path.join(__dirname, 'src/index.js')
            ]
        },
        output: {
            /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
            filename: '[name].[hash].js'
        },
        module: {
            rules: [
                {
                    test: /\.(css|scss|sass)$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer: {
            port: 10010,
            contentBase: path.join(__dirname, './dist'),
            historyApiFallback: true,
            host: '192.168.1.166',
            hot: true
        }
    }
    
    module.exports = merge({
        customizeArray(a, b, key) {
            /*entry.app不合并，全替换*/
            if (key === 'entry.app') {
                return b;
            }
            return undefined;
        }
    })(commonConfig, devConfig);
    ```

4. 替换前`webpack.config.js`配置

    ```
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const webpack = require('webpack');
    // const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
    const {CleanWebpackPlugin} = require('clean-webpack-plugin');
    const ExtractTextPlugin = require("extract-text-webpack-plugin");
    
    module.exports = {
        devtool: 'cheap-module-source-map',
        entry: {
            app: [
                path.join(__dirname, 'src/index.js')
            ],
            vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
        },
        output: {
            path: path.join(__dirname, './dist'),
            publicPath : '/',
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name].[chunkhash].js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: ['babel-loader'],
                    include: path.join(__dirname, 'src')
                },
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
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }]
                }
            ]
        },
        plugins: [
            // new ExtractTextPlugin({
            //     filename: './css/[name].[contenthash:5].css',
            //     allChunks: true
            // }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.join(__dirname, 'src/index.html')
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'runtime'
            }),
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
            new CleanWebpackPlugin(),
            new webpack.HashedModuleIdsPlugin()
        ],
        resolve: {
            alias: {
                pages: path.join(__dirname, 'src/pages'),
                components: path.join(__dirname, 'src/components'),
                router: path.join(__dirname, 'src/router')
            }
        }
    };
    ```
5.替换后`webpack.config.js`配置
    
    ```
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
    ```
# 优化目录结构并增加404页面

1. 新建根组件 components/App/APP.js


