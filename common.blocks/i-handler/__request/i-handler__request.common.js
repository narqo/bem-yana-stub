(function(HANDLER, _) {

var requests = HANDLER._requests = {};

HANDLER._queuedHandlers = [];

function findQueuedHandler(key) {
    var handler, i = 0;
    while(handler = HANDLER._queuedHandlers[i++]) {
        if(handler.key === key) {
            return handler;
        }
    }
}

var RequestHandler = _.inherit({
    __constructor : function(name, params) {
        this._name = name;
        this._params = params;
    },

    /**
     * @returns {Promise}
     */
    run : function() {
        if(this._promise) {
            return this._promise;
        }

        var key;
        if(this.isCacheable()) {
            var queuedHandler = findQueuedHandler(key = this.getKey());
            if(queuedHandler) {
                return this._promise = queuedHandler.block._promise;
            }
        }
        else {
            key = '__';
        }

        var promise = Vow.promise();
        HANDLER._queuedHandlers.push(
            {
                block : this,
                key   : key
            }) === 1 &&
                _.nextTick(this.__self._doRequest, this.__self);

        return this._promise = promise;
    },

    /**
     * @returns {String}
     */
    getKey : function() {
        var seen = [];
        return [
            this._name,
            JSON.stringify(this._params, function(key, val) {
                if(typeof val === 'object') {
                    if(~seen.indexOf(val))
                        return '[Circular]';
                    seen.push(val);
                }
                return val;
            })
        ].join('\x0B');
    },


    /**
     * @returns {Boolean}
     */
    isCacheable : function() {
        return true;
    },

    postProcess : function(res) {
        return res;
    }
}, {
    _name : '__base__',

    /**
     * @protected
     */
    _doRequest : function() {
        // TODO:
        //throw 'not implemented';

        var queuedHandlers = HANDLER._queuedHandlers;

        new HANDLER.Processor(
                queuedHandlers.map(function(handler) {
                    var block = handler.block;
                    return { name : block._name, params : block._params };
                }))
                .run()
                .then(this._onRequestDone.bind(this, queuedHandlers),
                        this._onRequestFailed.bind(this, queuedHandlers));

        queuedHandlers = HANDLER._queuedHandlers = [];
    },

    _onRequestDone : function(handlers, res) {
        handlers.forEach(function(handler, i) {
            var block = handler.block;
            typeof res[i].error !== 'undefined'?
                block._promise.reject(Error(res[i].error)) :
                block._promise.fulfill(block.postProcess(res[i].data));
        });
    },

    _onRequestFailed : function(handlers, err) {
        handlers.forEach(function(handler) {
            handler.block._promise.reject(Error(err.statusText));
        });
    }

});


HANDLER.declRequest = function(decl, props, staticProps) {
    typeof decl === 'string' && (decl = { block : decl });

    if(decl.base && !requests[decl.base])
        throw new Error('Base request handler "' + decl.base + '" is not defined!');

    var base = requests[decl.base || decl.block] || RequestHandler;

    (requests[decl.block] = _.inherit(base, props, staticProps))._name = decl.block;
};

HANDLER.run = function(name, param) {
    return new (requests[name] || RequestHandler)(name, param).run();
};

}(BEM.HANDLER, BEM.UTIL));
