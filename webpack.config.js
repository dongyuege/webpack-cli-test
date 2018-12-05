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