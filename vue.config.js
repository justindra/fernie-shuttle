module.exports = {
  // Set public path for Github Pages Deployment
  // https://cli.vuejs.org/guide/deployment.html#github-pages
  publicPath: process.env.NODE_ENV === 'production' ? '/fernie-shuttle/' : '/',
  // Progressive Web App Configurations
  pwa: {
    name: 'Fernie Ski Shuttle',
    themeColor: '#448aff',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/mstile-150x150.png'
    },
    manifestOptions: {
      background_color: '#ffffff'
    }
  }
};
