module.exports = {
  publicPath: '/',
  devServer: {
    // proxy: {
    //   '/survival.js': {
    //     target: 'https://cdn.splitbee.io',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '/survival.js': '/sb.js',
    //     },
    //   },
    //   '^/survival/': {
    //     target: 'https://hive.splitbee.io',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/survival/': '/',
    //     },
    //   },
    // },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('html-loader')
      .loader('html-loader');
  },
  pwa: {
    name: 'D&D & Me',
    themeColor: '#991B1B',
    msTileColor: '#000000',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'service-worker.js',
      // ...other Workbox options...
      exclude: [/\.map$/, /_redirects/],
    },
  },
};
