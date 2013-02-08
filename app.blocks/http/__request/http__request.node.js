App.http = inherit(App.http, {}, {

    _onRequest : function(req, res) {
        App.logger.log('\n-> Request received:', req.url);

        var stack = this._appStack,
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
                this._errorHandler(req, res, e);
                return;
            }
        }

        Vow.all(stackp)
            .then(this._finishRequest.bind(this, req, res))
            .fail(this._errorHandler.bind(this, req, res))
            .done();
    },

    /**
     * test-test-test
     */
    _commonHandler : function(req, res) {
        res.writeHead(200, { 'Content-Type' : 'text/plain; charset=utf-8' });
        res.write('Hello world\n');

        App.logger.log('-> common handler passed');
    },

    _errorHandler : function(req, res, err) {
        var code = err.code || 500;

        res.writeHead(code, { 'Content-Type' : 'text/plain; charset=utf-8' });
        res.end(err.stack || err.toString());

        App.logger.log('-> error catched', err);
    },

    _finishRequest : function(req, res) {
        res.end();

        App.logger.log('-> all handlers passed');
    },

    _normalizeRequest : function(req) {
        App.url.parse(req);
        App.url.parseQuery(req);
    },

    _initRequest : function() {
        this.__base();
        this.use(this._normalizeRequest);
    },

    // test-test-test
//    _initHandlers : function() {
//        this.use(this._commonHandler);
//    }

});
