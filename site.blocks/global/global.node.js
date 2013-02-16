exports.main = main;

function main() {
    // TODO: DomainHandler
    var handler = new App.Handler(App.Config.param('ROUTES'));

    // TODO: method, params
    handler
        .addRoute({
            rule   : '/objects/{id}',
            action : 'objects',
            method : 'get',
            params : {
                'new' : true,
                'type' : ['one', 'two']
            }
        });

    App.Config.param('REQUEST_PROCESSORS').push(handler.run());

    var server = new App.Http();

    server.start(App.Config.param('HTTP_PORT'));
//    server.start(App.Config.param('NODE_SOCKET'));
}


main();
