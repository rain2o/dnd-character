module.exports = {
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
  }
};
