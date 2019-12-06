module.exports = {
  // Set public path for Github Pages Deployment
  // https://cli.vuejs.org/guide/deployment.html#github-pages
  publicPath: process.env.NODE_ENV === 'production' ? '/fernie-shuttle/' : '/',
  // Progressive Web App Configurations
  pwa: {
    name: 'Fernie Ski Shuttle',
    themeColor: '#448aff'
  }
};
