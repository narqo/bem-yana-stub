App.page = inherit(App.resource, {

    _getMode : function() {
        return this._req.query._mode;
    },

    _createContext : function() {
        return require('vm').createContext({
                request  : this._req,
                responce : this._res
            });
    },

    handleRequest : function() {
        this.log('π handling request');
        var defer = Vow.promise();

        setTimeout(function() {
            defer.fulfill('page done!!');
        }, 500);

        return defer;
    }

});
