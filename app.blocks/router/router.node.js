App.router = {

    _init : function(routes) {
        this._routes = routes.map(function(route) {
            route.path = this._compile(route.rule);
            route.handler = this._getResource(route.resource);
            return route;
        }, this);
//        console.log(this._routes);
    },

    _compile : function(rule) {
        var path = rule.replace(/({.+?})/g, '(\\w+)').replace(/\//g, '\\/');
        return new RegExp('^' + path + '$');
    },

    _getResource : function(name) {
        return App.page;
    },

    _normalizeUrl : function(url) {
        if(url.length > 1 && url.slice(-1) === '/')
            return url.slice(0, -1);
        return url;
    },

    /**
     * @param {String} url
     * @returns {Object}
     */
    route : function(url) {
        url = this._normalizeUrl(url);

        var routes = this._routes,
            max = routes.length,
            p = 0;

        App.logger.log('>>> Trying "%s"', url);

        for(p = 0; p < max; p++) {
            var route = routes[p],
                m;

            if(m = url.match(route.path)) {
//                App.logger.log('+++', m);

                return {
                    page : route.handler,
                    path : url,
                    params : m
                };
            }
        }

        App.logger.log('¡ No resource found !');
        return {
            page : inherit(App.resource, {
                handle : function() { throw new App.HttpError(404, this._path); }
            }),
            path : url,
            params : {}
        };
    },

    requestHandler : function() {
        var _t = this;

        return function(req, res) {
            var url = App.url.parse(req),
                resource = _t.route(url.pathname);

            // XXX: ugly!
            return resource.page.create(resource.path, req, res).handle();
        };
    },

    create : function(routes, params) {
        App.logger.log('Router inited');

        this._init(routes, params);
        return this;
    }

};
