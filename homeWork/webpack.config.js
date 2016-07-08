var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = "./build";
module.exports = {
  entry:{
    "app":ROOT_PATH+"/main"
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
        include:[ROOT_PATH,path.resolve(ROOT_PATH, "node_modules/vue/src")],
        query:{
          presets:['es2015'],
          compact:false
        }
      },
      {
        test:/\.css$/,
        loader:'style!css',
        include:ROOT_PATH
      },
      {
        test:/\.html$/,
        loader:'html'
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
  ]
}
