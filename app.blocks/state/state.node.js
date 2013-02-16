App.StateHandler = inherit({

    run : function() {
        return this._stateHandler.bind(this);
    },

    _stateHandler : function(req, res) {
        this._parseCookies.apply(this, arguments);
    },

    _parseCookies : function(req, res) {
        if(req.cookies)
            return this;

        req.cookies = new this.__self._cookies(req, res);

        return this;
    }

}, {

    _cookies : require('cookies'),

    run : function() {
        return (new this()).run();
    }

});