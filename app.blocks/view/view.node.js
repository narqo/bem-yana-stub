App.View = (function() {

var views = {};

var View = inherit({

    __constructor : function(req, res, path) {
        this._req = req;
        this._res = res;
        this._path = path;
    },

    render : function(ctx) {
        App.Logger.log('Rendering request');
        return Vow.fulfill(1);
    },

    _createContext : function() {},

    _run : function() {
        App.Logger.log('Ω Page for action: "%s", path: "%s" running.',
                this.__self.getName(), this._path);

        var ctx = this._createContext();

        return Vow.when(this.render.call(this, ctx))
            .then(this._onCompleted.bind(this), this._onFailed.bind(this))
            .done();
    },

    _onCompleted : function(result) {
        App.Logger.log('Ω Request for action "%s" proccesed.', this.__self.getName());

        var typeResult = typeof result;

        result = typeResult === 'undefined'? '' :
            (typeResult === 'string'? result :
                result instanceof Buffer || result.toString());

        this._res.write(result, 'utf-8');
        this._res.end();
    },

    _onFailed : function(e) {
        App.Logger.log('Ω Request for action "%s" failed with "%s".',
                this.__self.getName(), e.message);

        throw new App.HttpError(500, e);
    }

}, {

    _name : '__super__',

    views : views,

    getName : function() {
        return this._name;
    },

    decl : function(decl, props) {
        typeof decl === 'string' && (decl = { block : decl });

        if(decl.base && !views[decl.base]) {
            throw new App.ViewError(
                    App.Util.format('No base view "%s" registered for view "%s"', decl.base, decl.block));
        }

        var base = views[decl.base || decl.block] || this;

        (views[decl.block] = inherit(base, props))._name = decl.block;
    },

    create : function(name, req, res, path) {
        if(!views[name]) {
            throw new App.ViewError('View is not registered "' + name + '"');
        }
        return new views[name](req, res, path);
    }

});

return View;

}());