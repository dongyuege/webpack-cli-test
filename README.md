>1.安装

>安装webpack npm i -g webpack

>安装webpack-cli npm i -g webpack-cli

>安装webpack-dev-server npm i webpack-dev-server -g

>用webpack -v测试是否安装成功

>2.package.json

```
{
  "name": "webpack1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server --inline"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "vue": "^2.5.17"
  },
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-preset-env": "^1.7.0",
    "css-loader": "^1.0.1",
    "html-webpack-plugin": "^3.2.0",
    "less": "^3.9.0",
    "less-loader": "^4.1.0",
    "style-loader": "^0.23.1",
    "vue-loader": "^15.4.2",
    "vue-template-compiler": "^2.5.17",
    "webpack": "^4.27.0"
  }
}

```

>3.创建项目

```
|-dist
|-index.html
|-src
|  |-assets
|  |   |-less.less
|  |   |-style.css
|  |-App.vue
|  |_main.js
|
|
|-package.json
|
|-webpack.config.js
```



>4.index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

>5.less.less

```

```

>6.style.css

```
h1{
    color: rgb(200, 233, 13)
}
#app{
    background: rgb(230, 25, 25)
}
```

>7.App.vue

```
<template>
    <div id="app">
        <h1>App</h1>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>
```

>8.main.js

```
import style from './assets/style.css'
import less from './assets/less.less'
//因为vue是在html里应用，所以在webpack编译的时候没有引入vue也不会报错
//导入vue
import Vue from 'vue/dist/vue.esm'//用于在webpack环境下开发时应用的
import App from '@/App'

new Vue({
   el:'#app',
   template:`<app></app>`,
   components:{
       App
   }
})
```

>9.webpack.config.js

```
const path=require('path')
const {VueLoaderPlugin}=require('vue-loader')
const HtmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
    //程序打包入口
    entry:'./src/main.js',
    //打包好的文件怎么输出
    output:{
        path:path.resolve('dist'),//配置输出的具体目录（必须是绝对路径）
        filename:'bundle.js',//定义打包好的文件叫什么名称
        // library:'lemon',//暴露全局api
        // libraryTarget:'umd'//暴露的模块类型
    },
    //模块处理,让webpack能够去处理非javascript文件
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'babel-loader'  
            },
            {
                //处理规则 处理什么文件（处理以.css结尾的文件）
                test:/\.css$/,//正则
                //需要安装模块处理器style-loader css-loader
                //style-loader  把webpack处理好的样式变成一个js脚本当运行的时候，把js脚本的代码添加到dom中
                //css-loader 就是把css文件处理成一个字符串
                loader:['style-loader','css-loader'],
                //include:[],//需要的一般不会配置
                exclude:[path.resolve('src','style.css')],//设置不需要的(style.css不会被编译)
            },
            {
                test:/\.less$/,
                loader:['style-loader','css-loader','less-loader']
            },
            {
                //处理vue需要vue-loader webpack vue-template-compiler
                test:/\.vue$/,
                loader:['vue-loader']
            },
        
        ]
    },
    //解析模块请求的选项
    resolve:{
        extensions:['.vue','.js'],//自动匹配文件后缀'.js'必须有(这个选项可以让模块导入时省略后缀)
        //给模块路径添加路径别名
        alias:{
          'vue':'vue/dist/vue.esm',//给vue的路径起个别名
          '@':path.resolve('src')
        }
    },
    //webpack-dev-server的配置
    devServer:{
        contentBase:path.resolve('dist'),//生成后的文件所在目录
        compress:true,//gzip压缩(一般不用管)
        // host:'localhost',//主机地址
        port:3000,//端口
        index:'index.html',//默认打开的html文件名称
        open:true,//在webpack-dev-server启动时默认自动打开html
        // inline: true


    },
    //插件
    plugins:[
        new VueLoaderPlugin(),
        //使用HtmlWebpackPlugin可以不用打包出文件，直接生成文件到内存中，网页加载的时候也从内存读取到，避免对磁盘进行频繁的读写
        new HtmlWebpackPlugin({//要配置参数不然会报错页面不能正常显示
            title:'标题',
            template:path.resolve('index.html'),//html文件模板

        })
    ],
    //开发模式
    mode:'development'//production
}
//development
//开发模式会保留注释 控制台输出
//production
//生产模式会清除注释 控制台输出 并且压缩代码
```
>10

>webpack 编译文件

>webpack-dev-server 开发服务器
