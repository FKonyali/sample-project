module.exports = {
    runtimeCompiler: true,
    publicPath: process.env.NODE_ENV === 'production' ?
        '/sample-project/' :
        '/',
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