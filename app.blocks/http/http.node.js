App.Http = inherit({

    __constructor : function() {
        this._stack = [];

        this
            ._loadMiddlewares()
            ._createServer();
    },

    start : function(port) {
        App.Logger.log('Server started on port %d', port);
        this._server.listen(port);
    },

    stop : function() {
        // TODO?
    },

    _stack : [],

    _loadMiddlewares : function() {
        this._stack = App.Config.param('REQUEST_PROCESSORS');
        return this;
    },

    _onRequest : function(req, res) {
        App.Logger.log('\nRequest for "%s" received', req.url);

        var stack = this._stack;

        for(var i = 0; i < stack.length; i++) {
            if(res.finished) {
                App.Logger.log('Response was finished before all the handlers processed!');
                // FIXME: do something usefull?
                return;
            }

            try {
                stack[i].call(this, req, res);
            } catch(e) {
                this._onError(req, res, e);
                return;
            }
        }
    },

    _onError : function(req, res, err) {
        App.Logger.log('Error catched', err);

        var code = err.code || 500;

        res.writeHead(code, { 'Content-Type' : 'text/plain; charset=utf-8' });
        res.end(err.stack || err.toString());
    },

    _createServer : function() {
        this._server ||
            (this._server = this.__self._http.createServer(this._onRequest.bind(this)));
    }

}, {

    _http : require('http')

});
