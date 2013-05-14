(function(global, BEM, Vow) {

var concat = Array.prototype.concat;

BEM.decl({ block : 'i-handler__processor', baseBlock : 'i-handler' }, {

    onSetMod : {
        js : {
            inited : function() {
                this._isRun = false;
                this._inputHandlers = this.params.handlers;
                this._bulkHandlersMap = this._buildBulkHandlersMap();
            }
        }
    },

    run : function() {
        if(this._isRun) {
            throw 'already run';
        }

        this._isRun = true;

        return Vow.allResolved(
                this._inputHandlers.map(
                    function(params) {
                        return this.runHandler(params._, params);
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
                    function(params) {
                        return this._getHandlerFutureBulkHandlers(params._);
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
        var blocks = this.__self.blocks;
        return blocks[handler] || blocks['i-handler__response'];
    },

    _getHandlerFutureBulkHandlers : function(handler) {
        var res = [],
            deps = [],
            providerCls = this._getResponseHandlerCls(handler),
            depHandler, depHandlerCls;

        if(providerCls) {
            deps = providerCls.getFutureHandlers();
        }

        while(deps.length) {
            depHandlerCls = this._getResponseHandlerCls(depHandler = deps.shift());
            depHandlerCls.isBulk() && res.push(depHandler);
            deps = deps.concat(depHandlerCls.getFutureHandlers());
        }

        return res;
    },

    _runHandler : function(handler, params) {
        this.trigger('run', { handler : handler, params : params });

        var providerCls = this._getResponseHandlerCls(handler);
        return Vow.promise(
                    BEM.create(providerCls.getName(), $.extend(params, { processor : this }))
                    .run()
                )
                .then(
            function(res) {
                this.trigger('success', { handler : handler, result : res });
                return res;
            }.bind(this),
            function(err) {
                this.trigger('fail', { handler : handler, error : err });
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

}(this, BEM, Vow));
