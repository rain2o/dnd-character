module.exports = {
  devServer: {
    https: true,
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
    }
  }
};
