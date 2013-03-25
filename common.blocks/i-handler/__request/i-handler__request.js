(function(global, BEM, Vow) {

BEM.decl('i-handler__request', {}, {

    /**
     * @protected
     * @override
     */
    _doRequest : function() {
        var queuedHandlers = this._queuedHandlers;

        $.ajax({
                url  : this.getProviderUrl(),
                type : 'POST',
                data : {
                    handlers : JSON.stringify(queuedHandlers.map(function(handler) {
                        return handler.block.params;
                    }))
                },
                dataType : 'json'
            }).then(
                this._onRequestDone.bind(this, queuedHandlers),
                this._onRequestFailed.bind(this, queuedHandlers));

        queuedHandlers = this._queuedHandlers = [];
    },

    /**
     * @public
     * @returns {String}
     */
    getProviderUrl : function() {
        return '/';
    }

});

}(this, BEM, Vow));
