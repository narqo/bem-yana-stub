Yana.View.decl({ block : 'index', base : 'page' }, {

    _getBemjson : function(ctx) {
        var promise = Vow.promise();

        this._template.BEMTREE.call(ctx)
            .then(function(bemjson) {
                return promise.fulfill(bemjson);
            });

        return promise;
    },

    /**
     * Мы собираем единый бандл `common.node.js` на все технологии,
     * поэтому ничего дополнительно загружать не нужно.
     */
    _getTemplate : function() {
        return { BEMTREE : BEMTREE, BEMHTML : BEMHTML };
    },

    _getHtml : function(json) {
        return this._template.BEMHTML.call(json);
    },

    render : function(ctx) {
        var bemJsonP = this._getBemjson(ctx);

        return bemJsonP.then(function(json) {
            return JSON.stringify(json, null, '  ');
        });

//        return bemJsonP.then(this._getHtml.bind(this));
    }

});
