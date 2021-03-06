const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /(\.js$|\.jsx$)/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
				loaders: ["style-loader", "css-loader", "sass-loader"],
				test: /\.scss$/
			},
			{
				loaders: ["url", "img"],
				test: /\.png$/
			}
    ]
  }
};
