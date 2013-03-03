App.View.decl('page', {

    __constructor : function() {
        this.__base.apply(this, arguments);

        this._template = this._getTemplate();
    },

    _createContext : function() {
        return {
            req : this._req,
            res : this._res,
            bundleName : 'index', //this._getName(),
            pageName : 'My page!',
            staticHost : App.Config.param('STATIC_URL')
        };
    },

    _getTemplate : function() {
        return { bemtree : BEMTREE, bemhtml : BEMHTML };
    },

    _getBemjson : function(ctx) {
        var promise = Vow.promise();

        this._template.bemtree.call(ctx, { callback : function(bemjson) {
            return promise.fulfill(bemjson);
        }});

        return promise;
    },

    _getHtml : function(bemjson) {
        return this._template.bemhtml.apply(bemjson);
    },

    render : function(ctx) {
        App.Logger.debug('Page handler is runnig with ctx');

        this._res.writeHead(200, { 'Content-Type' : 'text/html' });

        var _t = this;

        return this._getBemjson(ctx)
            .then(function(json) {
//                console.dir(require('util').inspect(json, false, 99));
//                return '<pre>' + JSON.stringify(json, null, 2) + '</pre>';

                return _t._getHtml(json);
            });
    }

});