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
        ];

    var server = App.http.create(),
        route = App.router.create(routes);

    server.use(App.request.normalize);
    server.use(route);

    server.startServer();
};
