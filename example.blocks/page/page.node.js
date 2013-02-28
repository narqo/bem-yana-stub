App.View.decl('page', {

    __constructor : function() {
        this.__base.apply(this, arguments);

        this._template = this._getTemplate();
    },

    _createContext : function() {
        return {
            req : this._req,
            res : this._res,
            bundleName : this._getName(),
            pageName : 'My page!'
        };
    },

    _getTemplate : function() {
        return { BEMTREE : BEMTREE, BEMHTML : BEMHTML };
    },

    _getBemjson : function(ctx) {
        var promise = Vow.promise();

        this._template.BEMTREE.call(ctx, { callback : function(bemjson) {
            return promise.fulfill(bemjson);
        }});

        return promise;
    },

    _getHtml : function(bemjson) {
        return this._template.BEMHTML.apply(bemjson);
    },

    render : function(ctx) {
        App.Logger.debug('Page handler is runnig with ctx');

        this._res.writeHead(200, { 'Content-Type' : 'text/html' });

        var _t = this;

        return this._getBemjson(ctx)
            .then(function(json) {
//                console.dir(require('util').inspect(json, false, 99));
//                return JSON.stringify(json, null, 2);

                return _t._getHtml(json);
            });
    }

});