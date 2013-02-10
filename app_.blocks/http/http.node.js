App.decl('http', {

    __constructor : function() {
        this._initServer();
    },

    _initServer : function(params) {
        this._app ||
            (this._app = this.__selft._http.createServer(this._onRequest.bind(this)));
        return this;
    },

    _onRequest : function(req, res) {
        App.logger.log('\n-> Request received:', req.url);

        var stack = this.__self._stack,
            stackp = [];

        for(var i = 0; i < stack.length; i++) {
            if(res.finished) {
                App.logger.log('¡ response was finished before all the handlers processed !');
                // TODO
                return;
            }

            try {
                var hres = stack[i].call(this, req, res);
                hres && stackp.push(hres);
            } catch(e) {
                this._onError(req, res, e);
                return;
            }
        }

        Vow.all(stackp)
            .then(this._onComplete.bind(this, req, res))
            .fail(this._onError.bind(this, req, res))
            .done();
    },

    _onError : function(req, res, err) {
        this.log('Error catched', err);

        var code = err.code || 500;

        res.writeHead(code, { 'Content-Type' : 'text/plain; charset=utf-8' });
        res.end(err.stack || err.toString());
    },

    _onComplete : function(req, res) {
        this.log('App handlers are passed!');
    },

    start : function(port) {
        this.log('Server started at port', port);

        this._app.listen(port);
        return this;
    }

}, {

    _http : require('http'),

    _stack : [],

    use : function(fn) {
        this._stack.push(fn);
        return this;
    }

});
