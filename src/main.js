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