/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const glob = require('glob');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const preprocess = require('svelte-preprocess');

const entry = glob.sync('./src/graphics/*.ts').reduce((all, match) => {
    all[path.basename(match, '.ts')] = match;
    return all;
}, {});

const mode = process.env.NODE_ENV || 'development';

const cssExtractor = {
    loader: MiniCssExtractPlugin.loader,
    options: { hmr: mode === 'development' },
};

module.exports = {
    entry,
    mode,
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'graphics'),
        filename: '[name].js',
    },
    devtool: mode === 'development' ? 'source-map' : false,
    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte'),
        },
        extensions: ['.mjs', '.js', '.ts', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main'],
    },
    module: {
        rules: [
            {
                test: /\.svelte$/,
                exclude: /node-modules/,
                loader: 'svelte-loader',
                options: {
                    preprocess: preprocess(),
                    emitCss: true,
                    hotReload: true,
                },
            },
            {
                test: /\.s(a|c)ss$/,
                use: [cssExtractor, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/,
                use: [cssExtractor, 'css-loader'],
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node-modules/,
            },
        ],
    },
    plugins: [
        ...Object.keys(entry).map(
            (entryName) =>
                new HtmlWebpackPlugin({
                    title: entryName,
                    filename: `${entryName}.html`,
                    template: 'src/graphics/template.ejs',
                }),
        ),
        new MiniCssExtractPlugin(),
    ].concat(
        mode === 'development' ? [new LiveReloadPlugin({ port: 0, appendScriptTag: true })] : [],
    ),
};
