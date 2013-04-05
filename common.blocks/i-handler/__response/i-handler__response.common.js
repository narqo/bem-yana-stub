modules.define(
    'i-handler__response',
    ['i-bem', 'utils'],
    function(provide, BEM, utils) {

BEM.decl({ block : 'i-handler__response' }, {

    onSetMod : {
        js : {
            inited : function() {
                this._processor = this.params.processor;
            }
        }
    },

    /**
     * @public
     */
    run : function() {
        throw 'not implemented';
    },

    /**
     * @protected
     * @param {String} handler
     * @param {Object} [params]
     */
    _runHandler : function(handler, params) {
        return this._processor.runHandler(handler, params, this.__self.getName());
    },

    /**
     * @protected
     * @param {String} handler
     */
    _releaseHandler : function(handler) {
        this._processor.releaseHandler(handler, this.__self.getName());
    },

    _getDefaultParams : function() {
        return {};
    }

}, {

    isBulk : function() {
        return false;
    },

    mergeParams : function(params) {
        throw 'not implemented';
    },

    getFutureHandlers : function() {
        return [];
    }

});

});
