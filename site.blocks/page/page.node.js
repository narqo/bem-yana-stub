Yana.View.decl('page', {

    __constructor : function() {
        this.__base.apply(this, arguments);

        this._template = this._getTemplate();
    },

    _getTemplatePath : function(name) {
        var path = App.Config.param('BUNDLES_ROOT');
        return require('path').join(path, name, ['_', name, '.node.js'].join(''));
    },

    _getTemplate : function() {
        var templates = this.__self._templates,
            name = this.__self.getName();

        App.Logger.debug('Trying template for "%s" from cache', name);

        if(templates[name])
            return templates[name];

        var template = this._getTemplatePath(name);

        Yana.Logger.debug('Trying template "%s"', template);

        return templates[name] = require(template);
    },

    render : function(ctx) {
        App.Logger.debug('å page handler is runnig with ctx');
    }

}, {

    _templates : {}

});
