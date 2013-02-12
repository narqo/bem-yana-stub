App.Handler = inherit({

    __constructor : function(routes) {
        this._router = new App.Router(routes);

        return this._handleRequest.bind(this);
    },

    _handleRequest : function(req, res) {
        var route = this._router.dispatch(req);

        App.Logger.log('%j', route);

        if(route.action === App.Router.NOT_FOUND) {
            this.handle404.call(this, req, res, route);
            return;
        }

        this.handleRequest.call(this, req, res, route);
    },

    _getViewClass : function() {
        return App.View;
    },

    handleRequest : function(req, res, route) {
        this._getViewClass()
            .create(route.action, req, res, route.path, route.params)
            ._run();
    },

    handle404 : function(req, res, route) {
        App.Logger.log('Not found: "%s"', route.path);
        throw new App.HttpError(404, 'Not found.');
    },

    handle500 : function(req, res) {
        throw new App.HttpError(500, 'Temporarily unavailable.');
    }

});