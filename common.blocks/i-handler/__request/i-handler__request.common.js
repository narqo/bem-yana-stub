(function(HANDLER, UTIL) {

// XXX: ugly
var queuedHandlers = HANDLER._queuedHandlers = [];

function findQueuedHandler(key) {
    var handler, i = 0;
    while(handler = queuedHandlers[i++]) {
        if(handler.key === key) {
            return handler;
        }
    }
}

var RequestHandler = inherit({
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
        queuedHandlers.push(
            {
                block : this,
                key   : key
            }) === 1 &&
                UTIL.nextTick(this.__self._doRequest, this.__self);

        return this._promise = promise;
    },

    getName : function() {
        return this._name;
    },

    /**
     * @returns {String}
     */
    getKey : function() {
        return [
            this.getName(),
            JSON.stringify(this._params)
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

        return new HANDLER.Processor(
                queuedHandlers.map(function(handler) {
                    return handler.block;
                }))
                .run()
                .then(this._onRequestDone.bind(this, queuedHandlers),
                        this._onRequestFailed.bind(this, queuedHandlers));
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


var requests = HANDLER._requests = {};

HANDLER.declRequest = function(decl, props, staticProps) {
    typeof decl === 'string' && (decl = { block : decl });

    if(decl.base && !requests[decl.base])
        throw Error('Base request handler "' + decl.base + '" is not defined!');

    var base = requests[decl.base || decl.block] || RequestHandler;

    (requests[decl.block] = inherit(base, props, staticProps))._name = decl.block;
};

HANDLER.run = function(name, param) {
    return new (requests[name] || RequestHandler)(name, param).run();
};

}(BEM.HANDLER, BEM.UTIL));