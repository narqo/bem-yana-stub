exports.main = main;

function main() {
    Yana.Config.params({

        routes : [
            { rule : '/', action : 'index' },
            { rule : '/albums', action : 'albums' },
            { rule : '/albums/{id}', action : 'album' },
        ]

    });

    (new Yana.Http).run();
};
