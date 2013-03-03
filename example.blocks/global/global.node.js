exports.main = main;

function main() {
    var path = require('path'),
        url = require('url'),
        join = path.join,

        PRJ_ROOT = path.resolve(__dirname, '../../'),
        BUNDLE_PATH = path.relative(PRJ_ROOT, __dirname) + path.sep;

    App.Config.params({

        PRJ_ROOT : PRJ_ROOT,

        BUNDLES_ROOT : join(PRJ_ROOT, 'examples.bundles'),

        STATIC_URL : url.resolve('http://127.0.0.1:8080/', BUNDLE_PATH),
        STATIC_ROOT  : __dirname,   // `STATIC_ROOT` is pointing to bundle's dir

        routes : [
            { rule : '/$', action : 'page' },
//            { rule : '/.+\.(?:css|js|ico)$', action : 'static' }
        ]

    });

    var app = new App.Http();
    // ..?
    app.run();
};
