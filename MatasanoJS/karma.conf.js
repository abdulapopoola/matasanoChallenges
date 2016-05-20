module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            'src/**/*.js',
            'tests/**/*.js'
        ],
        exclude: [
            './node_modules/**/*.js',
            './vscode/**/*.js'
        ],
        babelPreprocessor: {
            options: {
                presets: ['es2015'],
                sourceMap: 'inline'
            },
            filename: function (file) {
                return file.originalPath.replace(/\.js$/, '.es5.js');
            },
            sourceFileName: function (file) {
                return file.originalPath;
            }
        },
        preprocessors: {
            'src/**/*.js': ['babel'],
            'tests/**/*.js': ['babel']
        },
        browserify: {
            debug: true,
            transform: ['babelify']
        },
        browsers: ['PhantomJS']
    });
};
