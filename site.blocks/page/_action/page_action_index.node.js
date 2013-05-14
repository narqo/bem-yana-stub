Yana.View.decl({ block : 'index', base : 'page' }, {

    /**
     * Мы собираем единый бандл `common.node.js` на все технологии,
     * поэтому ничего дополнительно загружать не нужно.
     */
    _getTemplate : function() {
        return { bemtree : BEMTREE, bemhtml : BEMHTML };
    },

    _buildBemjson : function(ctx) {
        var promise = Vow.promise();

        this._template.bemtree.call(ctx)
            .then(function(bemjson) {
                return promise.fulfill(bemjson);
            });

        return promise;
    },

    _buildHtml : function(json) {
        return this._template.bemhtml.call(json);
    },

    render : function(ctx) {
        Yana.Logger.debug('Going to render page "%s"', this._getName());

        this._res.writeHead(200, { 'Content-Type' : 'text/html' });

        var bemJsonP = this._buildBemjson(ctx);

        return bemJsonP.then(function(json) {
            if(this._getMode() === 'json') {
                return Yana.Util.format('<pre>%s</pre>', JSON.stringify(json, null, 2));
            }

            return this._buildHtml(json);
        }.bind(this));
    }

});
