const remote = 'http://192.168.1.200:7000/pbs-api/'; //  'http://10.10.20.229/' ;
const serverName = 'http://192.168.1.200:7000/pbs-api/';

module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  // devServer: {
  //   clientLogLevel: 'warn',
  //   proxy: {
  //     '/api': {
  //       target: remote,
  //       ws: false, // proxy websockets
  //       changeOrigin: true, // needed for virtual hosted sites
  //     },
  //     '/help': {
  //       target: remote + serverName,
  //     },
  //     '/Help': {
  //       target: remote + serverName,
  //     },
  //     '/Areas': {
  //       target: remote + serverName,
  //     },
  //   },
  // },
  chainWebpack(config) {
    config.plugins.delete('prefetch');

    config.plugin('copy').tap(([options]) => {
      options[0].ignore.push('**/.MySCMServerInfo');
      return [options];
    });

    // config.externals((context, request, callback) => {
    //   if (/canvg|pdfmake/.test(request)) {
    //     return callback(null, `commonjs ${request}`);
    //   }
    //   return callback();
    // });
  },
  configureWebpack: {
    externals: [
      // {
      //   xlsx: 'XLSX',
      //   vue: 'Vue',
      //   'vue-router': 'VueRouter',
      //   moment: 'moment',
      //   underscore: '_',
      //   snapsvg: 'Snap',
      //   mockjs: 'Mock',
      //   // axios: 'axios',
      //   // 'element-ui': 'Element',
      //   '@amcharts/amcharts4/core': 'am4core',
      //   '@amcharts/amcharts4/charts': 'am4charts',
      // },
      (context, request, callback) => {
        if (/canvg|pdfmake/.test(request)) {
          return callback(null, `commonjs ${request}`);
        }
        callback();
      },
    ],
    // module: {
    //   rules: [
    //     {
    //       test: require.resolve('snapsvg/dist/snap.svg.js'),
    //       use: 'imports-loader?this=>window,fix=>module.exports=0',
    //     },
    //   ],
    // },
    // resolve: {
    //   alias: {
    //     snapsvg: 'snapsvg/dist/snap.svg.js',
    //   },
    // },
  },
  publicPath: process.env.NODE_ENV === 'production' ? `/${process.env.VUE_APP_IIS_WEB_APP}/` : '/',
};
