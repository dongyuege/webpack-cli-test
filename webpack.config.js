const path=require('path')
const {VueLoaderPlugin}=require('vue-loader')
module.exports={
    //程序打包入口
    entry:'./src/main.js',
    //打包好的文件怎么输出
    output:{
        path:path.resolve('dist'),//配置输出的具体目录（必须是绝对路径）
        filename:'bundle.js'//定义打包好的文件叫什么名称
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
                loader:['style-loader','css-loader']
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
    //插件
    plugins:[
        new VueLoaderPlugin()
    ],
    //开发模式
    mode:'development'//production
}
//development
//开发模式会保留注释 控制台输出
//production
//生产模式会清除注释 控制台输出 并且压缩代码