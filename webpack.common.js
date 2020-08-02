/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const glob = require('glob');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const preprocess = require('svelte-preprocess');

module.exports = (name) => {
    const entry = glob.sync(`./src/${name}/*.ts`).reduce((all, match) => {
        all[path.basename(match, '.ts')] = match;
        return all;
    }, {});

    const mode = process.env.NODE_ENV || 'development';

    const cssExtractor = {
        loader: MiniCssExtractPlugin.loader,
        options: { hmr: mode === 'development' },
    };

    return {
        entry,
        mode,
        target: 'web',
        output: {
            path: path.resolve(__dirname, name),
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
                    use: [
                        cssExtractor,
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    includePaths: ['./node_modules'],
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: [cssExtractor, 'css-loader'],
                },
                {
                    test: /\.ts$/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.browser.json',
                        },
                    },
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
                        chunks: [entryName],
                        template: `src/${name}/template.ejs`,
                    }),
            ),
            new MiniCssExtractPlugin(),
        ].concat(
            mode === 'development'
                ? [new LiveReloadPlugin({ port: 0, appendScriptTag: true })]
                : [],
        ),
    };
};
