App.decl('router', {

    __constructor : function(routes) {
        this._routes = routes.map(function(route) {
            route.path = this.__self._compile(route.rule);
            route.handler = this.__self._getResource(route.resource);

            return route;
        }, this);
    },

    _routes = [],

    /**
     * @param {String} url
     * @returns {Object}
     */
    route : function(url) {
        url = this.__self._normalizeUrl(url);

        var routes = this._routes,
            max = routes.length,
            p = 0;

        this.log('Going to route "%s"', url);

        for(p = 0; p < max; p++) {
            var route = routes[p],
                m;

            if(m = url.match(route.path)) {
                return {
                    page : route.handler,
                    path : url,
                    params : m
                };
            }
        }

        this.log('¡ No resource found !');
        return {
            page : 'no-found',
            path : url,
            params : {}
        };
    },

    requestHandler : function(req, res) {
        var url = App.url.parse(req),
            resource = _t.route(url.pathname);

        return resource.page.create(resource.path, req, res).handle();
    }

}, {

    _compile : function(rule) {
        var path = rule.replace(/({.+?})/g, '(\\w+)').replace(/\//g, '\\/');
        return new RegExp('^' + path + '$');
    },

    _normalizeUrl : function(url) {
        if(url.length > 1 && url.slice(-1) === '/')
            return url.slice(0, -1);
        return url;
    }

});
