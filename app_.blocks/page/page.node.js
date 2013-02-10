App.decl({ block : 'page', base : 'resource' }, {

    _getMode : function() {
        return this._req.query._mode;
    },

    handleRequest : function() {
        this.log('handling request');
        var defer = Vow.promise();

        setTimeout(function() {
            defer.fulfill('page done!!');
        }, 500);

        return defer;
    }

});
