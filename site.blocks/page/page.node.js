Yana.View.decl('page', {

    __constructor : function() {
        this.__base.apply(this, arguments);

        this._template = this._getTemplate();
    },

    _getTemplate : function() {
        var name = this.__self.getName(),
            template = name + '.bemtree.xjst';

        Yana.Logger.debug('Trying template "%s"', template);

        return require('./' + template);
    },

    render : function(ctx) {
        Yana.Logger.info('å page handler is runnig with ctx');
    }

});
