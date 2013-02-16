App.Config.params({

    REQUEST_PROCESSORS : [ App.StateHandler.run() ],

    ROUTES : [
        { rule : '/', action : 'index' },
        { rule : '/albums', action : 'albums' },
        { rule : '/albums/{id}', action : 'album' },
    ],

    HTTP_PORT : 3000,

    NODE_SOCKET : require('path').join('www-root', '.bem/node.socket'),

    BUNDLES_ROOT : ''

});
