App.http = inherit({}, {

    _http : require('http'),

    _appStack : [],

    _onRequest : function(req, res) {
        // noop
        res.end();
    },

    _initHandlers : function() { },

    _initRequest : function() { },

    _init : function(params) {
        this._server ||
            (this._server = this._http.createServer(this._onRequest.bind(this)));

        this._initRequest();
        this._initHandlers();

        return this;
    },

    create : function() {
        return this._init();
    },

    use : function(fn) {
        this._appStack.push(fn);
        return this;
    },

    startServer : function() {
        var port = App.config.get('port');
        App.logger.log('Server started at port', port);
        this._server.listen(port);
        return this;
    }

});
