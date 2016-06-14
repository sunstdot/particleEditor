var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = "E:/amazingCode/particleServer/assets/build";
var CSS_PATH = path.resolve(APP_PATH,'css');
module.exports = {
  entry:{
    "app":APP_PATH+"/plugin/particleEditor"
  },
  output:{
    path:BUILD_PATH,
    publicPath:BUILD_PATH,
    filename:'[name].js'
  },
  module:{
    loaders:[
      {
        test:/\.jsx?$/,
        loader:'babel',
        include:[APP_PATH,path.resolve(ROOT_PATH, "node_modules/vue/src")],
        query:{
          presets:['es2015'],
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
      }
    ]
  },
  externals:{
    //'$':'jquery'
  },
  devServer:{
    historyApiFallback:true,
    hot:true,
    inline:true,
    progress:true
  },
  //devtool:'eval-source-map',
  plugins:[
  ],
  resolve:{
    root:ROOT_PATH,
    alias: {
      echarts$: "echarts/lib/echarts.js",
      echarts: "echarts/lib",
      zrender$: "zrender/lib/zrender.js",
      zrender: "zrender/lib",
      //jquery:"jquery/jquery.js",
      vue:"vue/src/index.js"
    },
    modulesDirectories:['node_modules']
  }
}
