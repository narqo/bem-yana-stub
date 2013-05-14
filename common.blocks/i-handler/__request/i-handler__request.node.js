(function(global, BEM, Vow) {

BEM.decl('i-handler__request', {}, {

    /**
     * @protected
     * @override
     */
    _doRequest : function() {
        var queuedHandlers = this._getQueuedHandlers();

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
    }

});

}(this, BEM, Vow));
