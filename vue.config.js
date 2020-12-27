module.exports = {
    runtimeCompiler: true,
    chainWebpack: config => {
        config
        .plugin('html')
        .tap(args => {
            args[0].title = 'Sample Project'
            return args
        })
    },
    configureWebpack: {
        devtool: 'source-map'
    }
}