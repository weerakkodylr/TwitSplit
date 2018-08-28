const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer")

const nodeExternals = require('webpack-node-externals')

const browserConfig = {
  entry: ['babel-polyfill','./src/client/index.js'],
  output: {
    path: __dirname + '/public',
    filename: "js/bundle.js"
  },
  devtool: 'source-map', 
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query:{
          presets: ['react-app'],
          plugins: ['react-html-attrs']
        }
      },
      {
        test: [/\.svg$/,/\.gif/,/\.jpe?g$/,/\.png$/],
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]",
          //publicPath: url => url.replace(/public/,"")
        }     
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=/fonts/[name].[ext]'
      },
      {
          test: [/\.svg$/,/\.gif/,/\.jpe?g$/,/\.png$/], 
          use: [{
              loader: 'url-loader',
              options: { 
                  limit: 8000, // Convert images < 8kb to base64 strings
                  name: 'images/[name].[ext]',
                  //publicPath: url => url.replace(/public/,"")
              } 
          }]
      },
      {
        test: [/\.css$/, /\.less$/],
        //loader: ExtractTextPlugin.extract('css-loader!resolve-url-loader!less-loader')
		    use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "less-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: [autoprefixer()]
              }
            }
          ]
        })
      }
	  /*,
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=css/fonts/AvenirLTS/[name].[ext]'
      }*/
    ]
  },
  plugins: [
    new ExtractTextPlugin({ filename:  './css/style.css', allChunks: true})
    //if you want to pass in options, you can do so:
    //new ExtractTextPlugin({
    //  filename: 'style.css'
    //})
  ],
  resolve: {
    extensions: ['.js', '.json', '.less', '.sass', '.scss', '.css']
  }
};

const serverConfig = {
  entry: "./src/server/index.js",
  target: "node",
  output: {
    path: __dirname,
    filename: "server.js",
    libraryTarget: "commonjs2"
  },
  externals: [nodeExternals()],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query:{
          presets: ['react-app'],
          plugins: ['react-html-attrs']
        }
      },
      {
        test: [/\.svg$/,/\.gif/,/\.jpe?g$/,/\.png$/],
        loader: "file-loader",
        options: {
          name: "public/images/[name].[ext]",
          publicPath: url => url.replace(/public/,""),
          emit: false
        }     
      },
      {
        test: /\.css$/,
        //loader: ExtractTextPlugin.extract('css-loader!resolve-url-loader!less-loader')
        use: [
          {
            loader: "css-loader/locals"
          }
        ]

      },
      
    ],

  }
} 

module.exports = [
  browserConfig, 
  serverConfig
  ]
