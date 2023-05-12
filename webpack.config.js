const path = require('path');

module.exports = {
    target: 'node', // Bundle for Node.js environment
    entry: './src/server.js', // Entry point of your application
    output: {
        path: path.resolve(__dirname, 'build'), // Output directory
        filename: 'bundle.js' // Output filename
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Transpile JavaScript files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'] // Use Babel preset for modern JavaScript
                    }
                }
            }
        ]
    },
    externals: [require('webpack-node-externals')()], // Exclude external Node modules from the bundle
};
