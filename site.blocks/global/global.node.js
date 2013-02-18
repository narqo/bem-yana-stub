exports.main = main;

function main() {
    App.Config.params({

        routes : [
            { rule : '/', action : 'index' },
            { rule : '/albums', action : 'albums' },
            { rule : '/albums/{id}', action : 'album' },
        ]

    });

    (new App.Http())
        .start(App.Config.param('node').port);
};
