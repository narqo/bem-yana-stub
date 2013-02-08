App.page = inherit(App.page, {

    // FIXME: hardcode
    _view : require('./index.bemtree.xjst'),

    handleRequest : function() {
        this.log('å processing request');

        var ctx = this._createContext();
        return Vow.when(this.run.call(this, ctx), function(page) {
            return page;
        });
    },

    run : function(ctx) {
        this.log('å page handler is runnig with ctx');

        var bemJsonP = this._getBemjson(ctx),
            mode = this._getMode();

        if(mode === 'json') {
            return bemJsonP.then(this._returnJson.bind(this));
        }

        return bemJsonP.then(this._getHtml.bind(this));
    },

    _getBemjson : function(ctx) {
        var defer = Vow.promise();
        this._view.BEMTREE.call(ctx, { callback : function(bemjson) {
            return defer.fulfill(bemjson);
        }});
        return defer;
    },

    _getHtml : function(data) {
        this._res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return this._view.BEMHTML.apply(data);
    },

    _returnJson : function(data) {
        this.log('%j', data)
        this._res.statusCode = 200;
        this._res.setHeader('Content-Type', 'text/json; charset=utf-8');
        return JSON.stringify(data, null, '  ');
    }

});
