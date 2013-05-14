(function(HANDLER, UTIL) {

HANDLER.declResponse('bulk-users', {
    run : function() {
        var res = {};
        this._params.ids.forEach(function(id) {
            res[id] = { id : id, login : 'login' + id };
        });
        return Vow.fulfill(res);
    }
}, {
    isBulk : function() {
        return true;
    },

    mergeParams : function(params) {
        return params.reduce(
            function(res, params) {
                res.ids = UTIL.unique(res.ids.concat(params.ids));
                return res;
            },
            { ids : [] });
    }
});

}(BEM.HANDLER, BEM.UTIL));