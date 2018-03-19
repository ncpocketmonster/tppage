var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: './source/index.js',
  output: {
    filename: 'react_out.js',
    path: path.resolve(__dirname, 'compiled'),
    //comments: false,  // remove all comments
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-0', 'react'],
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test:/\.scss$/,
        use:['style-loader','css-loader','sass-loader'],
      }
    ],
  },
  plugins:[  
    new webpack.DefinePlugin({ // <-- 减少 React 大小的关键  
      'process.env': {  
        'NODE_ENV': JSON.stringify('production')  
      }  
    }),  
    new webpack.optimize.UglifyJsPlugin(), //最小化一切  
    new webpack.optimize.AggressiveMergingPlugin()//合并块  
   ] 
};
