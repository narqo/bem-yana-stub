modules.define(
    'i-handler__request',
    ['i-bem', 'utils'],
    function(provide, BEM, utils) {

BEM.decl('i-handler__request', {}, {

    /**
     * @protected
     * @override
     */
    _doRequest : function() {
        var queuedHandlers = this._queuedHandlers;

        BEM.create('i-handler__processor', {
                handlers : queuedHandlers.map(function(handler) {
                    return handler.block.params;
                })
            })
            .run()
            .then(
                this._onRequestDone.bind(this, queuedHandlers),
                this._onRequestFailed.bind(this, queuedHandlers)
            );

        queuedHandlers = this._queuedHandlers = [];
    }

});

});
