(function(HANDLER) {

var concat = Array.prototype.concat;

HANDLER.Processor = inherit(HANDLER.CommonProcessor, {
    __constructor : function(handlers, params) {
        this._isRun = false;
        this._inputHandlers = handlers;
        this._params = params;
        this._bulkHandlersMap = this._buildBulkHandlersMap();
    },

    run : function() {
        if(this._isRun) {
            throw 'already run';
        }
        this._isRun = true;

        return Vow.allResolved(
                this._inputHandlers.map(
                    function(block) {
                        return this.runHandler(block.getName(), block._params);
                    },
                    this))
            .then(function(res) {
                return res.map(function(res) {
                    var val = res.valueOf();
                    return res.isFulfilled()?
                        { data : val } :
                        { error : val instanceof Error? val.message : val.toString() };
                });
            });
    },

    runHandler : function(handler, params, fromHandler) {
        var bulkHandlerDesc = this._bulkHandlersMap[handler];
        if(bulkHandlerDesc) {
            bulkHandlerDesc.params.push(params);
            var fromHandlerBulkDesc = this._bulkHandlersMap[fromHandler];
            if(!(bulkHandlerDesc.pendingCnt -= fromHandlerBulkDesc? fromHandlerBulkDesc.cnt : 1)) {
                this._runBulkHandler(handler, bulkHandlerDesc.params);
            }

            return bulkHandlerDesc.promise;
        }

        return this._runHandler(handler, params);
    },

    releaseHandler : function(handler, fromHandler) {
        var bulkHandlers = this._getHandlerFutureBulkHandlers(handler);
        this._bulkHandlersMap[handler] && bulkHandlers.push(handler);
        bulkHandlers.forEach(
            function(handler) {
                var bulkHandlerDesc = this._bulkHandlersMap[handler];
                var fromHandlerBulkDesc = this._bulkHandlersMap[fromHandler];
                if(bulkHandlerDesc.releasedFromBulkHandlers[fromHandler]) {
                    return;
                }
                bulkHandlerDesc.releasedFromBulkHandlers[fromHandler] = true;

                if(!(bulkHandlerDesc.pendingCnt -= fromHandlerBulkDesc? fromHandlerBulkDesc.cnt : 1) &&
                        bulkHandlerDesc.params.length) {
                    this._runBulkHandler(handler, bulkHandlerDesc.params);
                }
            },
            this);
    },

    _buildBulkHandlersMap : function() {
        return concat.apply(
            [],
            this._inputHandlers
                .map(
                    function(block) {
                        return this._getHandlerFutureBulkHandlers(block.getName());
                    },
                    this))
                .reduce(
                    function(res, handler) {
                        res[handler] || (res[handler] = {
                            pendingCnt               : 0,
                            cnt                      : 0,
                            releasedFromBulkHandlers : {},
                            params                   : [],
                            promise                  : Vow.promise()
                        });

                        ++res[handler].pendingCnt;
                        ++res[handler].cnt;

                        return res;
                    },
                    {});
    },

    _getResponseHandlerCls : function(handler) {
        return HANDLER._responses[handler];
    },

    _getHandlerFutureBulkHandlers : function(handler) {
        var res = [],
            deps = this._getResponseHandlerCls(handler).getFutureHandlers(),
            depHandler, depHandlerCls;

        while(deps.length) {
            depHandlerCls = this._getResponseHandlerCls(depHandler = deps.shift());
            depHandlerCls.isBulk() && res.push(depHandler);
            deps = deps.concat(depHandlerCls.getFutureHandlers());
        }

        return res;
    },

    _runHandler : function(handler, params) {
        this.emit('run', { handler : handler, params : params });

        return Vow.promise(new (this._getResponseHandlerCls(handler))(handler, params, this).run()).then(
            function(res) {
                this.emit('success', { handler : handler, result : res });
                return res;
            }.bind(this),
            function(err) {
                this.emit('fail', { handler : handler, error : err });
                throw err;
            }.bind(this));
    },

    _runBulkHandler : function(handler, params) {
        var bulkHandlerDesc = this._bulkHandlersMap[handler];
        this._runHandler(
                handler,
                this._getResponseHandlerCls(handler).mergeParams(params))
            .then(
                function(val) {
                    bulkHandlerDesc.promise.fulfill(val);
                },
                function(err) {
                    bulkHandlerDesc.promise.reject(err);
                });
    }
});

}(BEM.HANDLER));