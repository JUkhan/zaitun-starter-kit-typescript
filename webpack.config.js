var path = require('path');
var webpack = require('webpack');
var DEVELOPMENT = process.env.NODE_ENV === 'development';
var PRODUCTION = process.env.NODE_ENV === 'production';
var entry = PRODUCTION
    ? ['./src/main.tsx']
    : [
          './src/main.tsx',
          'webpack/hot/dev-server',
          'webpack-dev-server/client?http://localhost:8080'
      ];

var plugins = PRODUCTION
    ? [
          new webpack.optimize.UglifyJsPlugin()
          // new ExtractTextPlugin('style-[contenthash:10].css'),
          // new HTMLWebpackPlugin({
          // 	template: 'index-template.html'
          // })
      ]
    : [new webpack.HotModuleReplacementPlugin()];
var babelOptions = {
    presets: [
        'react',
        [
            'es2015',
            {
                modules: false
            }
        ],
        'es2016'
    ]
};
// plugins.push(
// 	new webpack.DefinePlugin({
// 		DEVELOPMENT: JSON.stringify(DEVELOPMENT),
// 		PRODUCTION: JSON.stringify(PRODUCTION)
// 	})
// );
module.exports = {
    cache: true,
    //devtool: 'source-map',
    entry: entry,
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    plugins: plugins,
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
};
