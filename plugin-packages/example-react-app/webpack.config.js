
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: `${__dirname  }/src`,
    output: {
        path: `${__dirname  }/dist`,
        filename: 'bundle.js',
    },
    target: ['web', 'es5'],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.(png|gif|jpg|jpeg|ttf|eot|woff(2)?)$/,
                type: 'asset/resource'
            },
        ],
    },
    externals: [],
    plugins: [
        new ESLintPlugin({
            fix: true,
        })
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        open: true,
        static: {
            directory: path.join(__dirname, 'src'),
        },
    },
};
