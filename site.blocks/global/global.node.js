exports.main = main;

function main() {
    var path = require('path'),
        join = path.join,

        PRJ_ROOT = path.resolve(__dirname, '../../'),
        BUNDLES_ROOT = join(PRJ_ROOT, 'desktop.bundles'),
        // TODO
        STATIC_ROOT = join(PRJ_ROOT);

    App.Config.params({

        PRJ_ROOT : PRJ_ROOT,

        BUNDLES_ROOT : BUNDLES_ROOT,

        routes : [
            { rule : '/$', action : 'index' },
            { rule : '/albums', action : 'albums' },
            { rule : '/albums/{id}', action : 'album' },
            { rule : '/.+\.(?:ico|css|js)$', action : 'static' }
        ]

    });

    (new App.Http()).run();
};
