const {override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    // antd按需打包   使用了babel-plugin-import
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,    // 自动打包相关的样式
    }),
    // 使用less-loader对源码中的less变量进行重新指定
    addLessLoader({
        javascriptEnabled: true,
        // 作为一个变量，可去官网查看样式定制  这里是自定义主题的一个设置
        modifyVars: {'@primary-color': '#1DA57A'},    
    })
)