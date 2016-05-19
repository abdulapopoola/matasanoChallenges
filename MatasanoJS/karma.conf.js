module.exports = function(config) {
    config.set({
        frameworks: ['browserify', 'jasmine'],
        files: [
            'src/**/*.js',
            'tests/**/*.js'
        ],
        exclude: [
            './node_modules/**/*.js',
            './vscode/**/*.js'
        ],
        preprocessors: {
            'src/**/*.js': ['browserify', 'eslint'],
            'tests/**/*.js': ['browserify', 'eslint']
        },
        browserify: {
            debug: true,
            transform: ['babelify']
        },
        browsers: ['PhantomJS']
    });
};
