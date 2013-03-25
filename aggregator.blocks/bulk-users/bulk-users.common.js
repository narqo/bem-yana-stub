(function(global, BEM, Vow) {

BEM.decl({ block : 'bulk-users', baseBlock : 'i-handler__response' }, {

    run : function() {
        var res = {};
        this.params.ids.forEach(function(id) {
            res[id] = { id : id, login : 'login' + id };
        });
        return Vow.fulfill(res);
    }

}, {

    isBulk : function() {
        return true;
    },

    mergeParams : function(params) {
        var _t = this;
        return params.reduce(
            function(res, params) {
                res.ids = _t._.unique(res.ids.concat(params.ids));
                return res;
            },
            { ids : [] });
    }

});

}(this, BEM, Vow));