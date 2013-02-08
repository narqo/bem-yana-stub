App.resource = inherit({

    __constructor : function(path, req, res) {
        this._path = path;
        this._req = req;
        this._res = res;
    },

    handle : function() {
        this.log('≈ handler "%s" is running', this._path);
        return this.handleRequest.apply(this, arguments)
            .then(this._onCompleated.bind(this), this._onFailed.bind(this));
    },

    /** @protected */
    handleRequest : function() {
        this.log('≈ handling request');
        return Vow.fulfill(1);
    },

    log : function() {
        App.logger.log.apply(App.logger, arguments);
    },

    _onCompleated : function(res) {
        this.log('≈ request proccesed with %j', arguments);
        this._res.write(res);
    },

    _onFailed : function(e) {
        this.log('≈ request failed with "%s"', e.message);
        throw new App.HttpError(500, e);
    }

}, {

    create : function(path, req, res) {
        return new this(path, req, res);
    }

});

