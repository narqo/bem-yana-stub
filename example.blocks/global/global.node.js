exports.main = main;

function main() {
    var path = require('path'),
        PRJ_ROOT = path.resolve(__dirname, '../../');

    App.Config.params({

        PRJ_ROOT : PRJ_ROOT,

        routes : [
            { rule : '/$', action : 'page' }
        ]

    });

    var app = new App.Http();
    // ..?
    app.run();
};
