App.View.decl('page', {

    __constructor : function() {
        this.__base.apply(this, arguments);

        this._template = this._getTemplate();
    },

    _getTemplateName : function(name) {
        return ['_', name, '.priv.js'].join('');
    },

    _getTemplate : function() {
        var template = this._getTemplateName(this.__self.getName());

        App.Logger.log('Trying template "%s"', template);

        return require('./' + template);
    },

    render : function(ctx) {
        App.Logger.log('å page handler is runnig with ctx');
    }

});
