exports.main = main;

function main() {
    var path = require('path'),
        join = path.join,

        PRJ_ROOT = path.resolve(__dirname, '../../');

    App.Config.params({

        PRJ_ROOT : PRJ_ROOT,

        BUNDLES_ROOT : join(PRJ_ROOT, 'examples.bundles'),

        STATIC_ROOT  : __dirname,   // `STATIC_ROOT` is pointing to bundle's dir

        routes : [
            { rule : '/$', action : 'page' },
            { rule : '/.+\.(?:css|js|ico)$', action : 'static' }
        ]

    });

    var app = new App.Http();
    // ..?
    app.run();
};
