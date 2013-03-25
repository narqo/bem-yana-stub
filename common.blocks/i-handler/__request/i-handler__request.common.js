(function(global, BEM, Vow) {

var queuedHandlers = [];

function findQueuedHandler(key) {
    var handler, i = 0;
    while(handler = queuedHandlers[i++]) {
        if(handler.key === key) {
            return handler;
        }
    }
}


BEM.decl({ block : 'i-handler__request', baseBlock : 'i-handler' }, {

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
                this._.nextTick(this.__self._doRequest, this.__self);

        return this._promise = promise;
    },

    /**
     * @returns {String}
     */
    getKey : function() {
        var seen = [];
        return [
            this.__self.getName(),
            JSON.stringify(this.params, function(key, val) {
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

    /**
     * @param {Any} res
     * @returns {Any}
     */
    postProcess : function(res) {
        return res;
    }

}, {

    _queuedHandlers : queuedHandlers,

    /**
     * @protected
     */
    _doRequest : function() {
        throw 'not implemented';
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

}(this, BEM, Vow));
