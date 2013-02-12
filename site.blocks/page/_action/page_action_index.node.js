App.View.decl({ block : 'index', base : 'page' }, {

    _getBemjson : function(ctx) {
        var promise = Vow.promise();

        this._template.BEMTREE.call(ctx, { callback : function(bemjson) {
            return promise.fulfill(bemjson);
        }});

        return promise;
    },

    _getHtml : function(json) {
        return this._template.BEMHTML.call(json);
    },

    /*
    _returnJson : function(data) {
        this.log('%j', data)
        this._res.statusCode = 200;
        this._res.setHeader('Content-Type', 'text/json; charset=utf-8');
        return JSON.stringify(data, null, '  ');
    },
    */

    render : function(ctx) {
        var bemJsonP = this._getBemjson(ctx);
//            mode = this._getMode();

        return bemJsonP.then(function(json) {
            return JSON.stringify(json, null, '  ');
        });

        if(mode === 'json') {
            return bemJsonP.then(this._returnJson.bind(this));
        }

        return bemJsonP.then(this._getHtml.bind(this));
    }

});
