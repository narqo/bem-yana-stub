exports.main = main;

function main() {
    var path = require('path'),
        join = path.join,

        PRJ_ROOT = path.resolve(__dirname, '../../'),
        BUNDLES_ROOT = join(PRJ_ROOT, 'examples.bundles'),
        // TODO
        STATIC_ROOT = join(PRJ_ROOT);

    App.Config.params({

        application : {
            root : PRJ_ROOT,
            bundlesRoot : BUNDLES_ROOT
        },

        routes : [
            { rule : '/', action : 'page' }
        ]

    });

    (new App.Http())
        .run(App.Config.param('node').port);
};
