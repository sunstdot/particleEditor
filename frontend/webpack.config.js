var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = "./build";

var CSS_PATH = path.resolve(APP_PATH,'css');
module.exports = {
  entry:{
    "particleEditor":APP_PATH+"/particleEditor"
  },
  output:{
    path:BUILD_PATH,
    publicPath:BUILD_PATH,
    filename:'[name].bundle.js'
  },
  module:{
    loaders:[
      {
        test:/\.jsx?$/,
        loader:'babel',
        include:[APP_PATH,path.resolve(ROOT_PATH, "node_modules/vue/src")],
        query:{
          presets:['es2015'],
          plugins:['transform-object-assign'],
          compact:false
        }
      },
      {
        test:/\.css$/,
        loader:'style!css',
        include:APP_PATH
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=500000&name=[path][name].[ext]'
      },
      {
        test:require.resolve('jquery'),
        loader:'expose?$!expose?jQuery'
      },
      {
        test:/\.html$/,
        loader:'html'
      },
      {
        test:/\.vue$/,
        loader:'vue'
      }
    ]
  },
  externals:{
  },
  devServer:{
    historyApiFallback:true,
    hot:true,
    inline:true,
    progress:true
  },
  plugins:[
  ],
  resolve:{
    root:ROOT_PATH,
    alias: {
      'jquery.ui':"jquery-ui",
      echarts$: "echarts/lib/echarts.js",
      echarts: "echarts/lib",
      zrender$: "zrender/lib/zrender.js",
      zrender: "zrender/lib",
      vue:"vue/src/index.js"
    },
    modulesDirectories:['node_modules']
  }
}
