App.start = function(/* TODO: env */) {
    App.logger.log('Application started');

    var routes = [
            {
                rule : '/',
                resource : 'index'
            },
            {
                rule : '/album/{album-id}',
                resource : 'album',
                method : 'get'  // TODO?
            },
            {
                rule : '/album/{album-id}/view/{photo-id}',
                resource : 'photo'
            }
        ],
        // TODO
        params = {
            'album-id' : '\d+'
        };

    var router = App.router.create(routes, params),
        server = App.http.create();

    /*
    server.use(function() {
        console.log('Custom handler!');
        throw "Error Error Error";
    });
    */

    server.use(router.requestHandler());
//        .use(App.datasrc.create());

    server.startServer();
};
