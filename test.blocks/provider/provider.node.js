Yana.View.decl('provider', {

    render : function(ctx) {
        var req = this._req,
            res = this._res;

        var handlers = JSON.parse(req.body.handlers);

        return BEM.create('i-handler__processor', { handlers : handlers })
            .run()
            .then(function(result) {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');

                return JSON.stringify(result);
            });
    }

});