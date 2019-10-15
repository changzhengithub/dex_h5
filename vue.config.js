// const DevUrl = 'http://192.168.0.101:8180'
// const ProUrl = 'http://api.hefeidaixiaoer.com'
// const target = process.env.NODE_ENV === 'production' ? ProUrl : DevUrl
// const webpack = require('webpack')
module.exports = {
    // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
    productionSourceMap: false,
    // devServer:{type:Object} 3个属性host,port,https
    // 它支持webPack-dev-server的所有选项
    devServer: {
        host: '192.168.31.172',
        port: 8080, // 端口号
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy: {
            '/api': {
                target: 'target',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    // 全局配置sass
    css: {
        loaderOptions: {
            sass: {
                // @是src的别名
                data: `
              @import "@/assets/sass/main.scss";
            `
            }
        }
    },
    // vue 多页面配置
    pages: {
        index: {
            entry: "src/pages/index/main.js",
            template: "public/index.html",
            filename: "index.html",
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        sign: {
            entry: "src/pages/sign/main.js",
            template: "public/sign.html",
            filename: "sign.html",
        },
        invite: {
            entry: "src/pages/invite/main.js",
            template: "public/invite.html",
            filename: "invite.html",
        },
        share: {
            entry: "src/pages/share/main.js",
            template: "public/share.html",
            filename: "share.html",
        },
        'mall-share': {
            entry: "src/pages/mall-share/main.js",
            template: "public/mall-share.html",
            filename: "mall-share.html",
        },
        report: {
            entry: "src/pages/report/main.js",
            template: "public/report.html",
            filename: "report.html",
        },
        'sign-copy': {
            entry: "src/pages/sign-copy/main.js",
            template: "public/sign-copy.html",
            filename: "sign-copy.html",
        },
        lottery: {
            entry: "src/pages/lottery/main.js",
            template: "public/lottery.html",
            filename: "lottery.html",
        },
    },
    // configureWebpack: {
    //   plugins: [
    //       new webpack.ProvidePlugin({
    //           $:"jquery",

    //           jQuery:"jquery",
    //           "windows.jQuery":"jquery"
    //       })
    //   ]
    // },
    // configureWebpack: {
    //   externals: {
    //     'vue': 'Vue',
    //     'vuex': 'Vuex',
    //     'vue-router': 'Router'
    //   }
    // }
}