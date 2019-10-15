# dxe_h5

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 版本
项目采用 vue-cli 3.0版本脚手架搭建，使用时请先把vue-cli 版本更新到3.0 以上版本
vue-cli  [文档地址] (https://cli.vuejs.org/zh/).

### 文件
/* public
vue-cli3.0 中 static文件夹被改为public文件
static文件下的font文件夹放的是通过字蛛生成的字体文件
iconfont是小图标
script下的js文件是文件加载时需要的数据和函数，主要用来和原生用来交互

/* assets
assets文件主要放一下静态文件的，主要有css reset、sass reset、图片等
/* views
vue文件主要放在views文件内
/* components
组件或者公共组件放在components文件内
/* vue.config.js
webpack的配置内容主要放在vue.config.js文件内，这个文件需要自己创建
/* class
class 文件主要是一些对js文件的封装，Http 文件是对axios的封装，url 用来存放项目地址
/* pages
pages文件下是不同页面的入口文件

### 分页
项目需要使用多页面来部署，所以采用分页技术来控制不同页面进入
在pages文件是配置不同的入口文件来生成多页面，并在public创建县对应的HTML页面
并在vue.config.js 的 pages中配置生成页面

### 原生交互
Android和ios分别用不同方法来获取
在public/static/script里新建app.api.js文件，在HTML里引入，页面进来就进行加载
全局定义一个'JsInterface'对象，这个对象为Android定义好注入的，
如果这个对象不为'undefined'就是安卓系统，进行安卓交互，反之，就进行IOS交互
安卓交互使用JsInterface.fn(['参数'])(fn为前端与原生定义好的方法名)来进行调用原生安卓方法，安卓接收到方法进行处理。
并把结果自动返回出来，直接赋值就可以了。
IOS交互使用window.webkit.messageHandlers.fn.postMessage('参数')，此参数为必传的，如果不需要参数，可随意传递一个字符串，
否则IOS接收不到此方法。调用此方法后，此时IOS就可以接收到方法来进行处理了。
如果需要IOS返回数据，则需要在定义一个回调函数来接收传回的值。
window.fnCallback = function (data) {
  window.data = data
}

生产环境调用接口需要鉴权，在每次调用接口时都要先调用window.Init()方法获取token来进行鉴权。

### 数据传递
vue 数据传递一个是使用组件之间进行传递，而是使用vuex进行数据状态管理
组件传递：
父组件向子组件传递数据时使用 'props'进行传递，子组件接收props: ['data']
子组件向父组件传递： 子组件使用 this.$emit('NAME_EVENT', [参数]) 向父组件传递'NAME_EVENT'函数名，定位大写并在后面加'EVENT'表示传递数据
vuex状态管理器：
在store.js里的state对象里定义要管理的状态名并为null，
在mutations或者actions对象里定义数据管理方法
使用：
在需要修改数据的组件里引入mapMutations
import { mapMutations, mapState } from 'vuex'
在methods里写入要使用的方法...mapMutations(['方法名', '方法名2'])以数组的形式保存
调用： this.方法名(参数)
获取state里的数据
computed: {
  ...mapState(['数据名'])
}
调用:this.数据名


