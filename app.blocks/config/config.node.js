App.Config = inherit({

    param : function(name, val) {
        return this.__self._param(name, val);
    }

}, {

    param : function(name, val) {
        if(typeof val !== 'undefined') {
            this.__env[name] = val;
        }

        return this.__env[name];
    },

    params : function(params) {
        // FIXME: ugly
        return this.__env = params;
    },

    __env : {
        REQUEST_PROCESSORS : [],
    }

});
