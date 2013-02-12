exports.main = main;

function main() {
    var routes = [
            { rule : '/', action : 'index' },
            { rule : '/albums', action : 'albums' },
            { rule : '/albums/{id}', action : 'album' },
        ],
        commonHandler = new App.Handler(routes);

    App.Config.params({
        REQUEST_PROCESSORS : [commonHandler],
        HTTP_PORT : 3000
    });

    var server = new App.Http();

    server.start(App.Config.param('HTTP_PORT'));
}


main();
