var App = (function() {

/** cache */
var blocks = [];

var App = inherit({

    log : function() {
        this.__self.log.apply(this, arguments);
    }

}, {

    _name : 'app',

    blocks : blocks,

    log : function() {
        App.logger.log.apply(App.logger, arguments);
    }

    decl : function(decl, props, staticProps) {

        typeof decl === 'string' && (decl = { block : decl });

        if(decl.baseBlock && !blocks[decl.baseBlock])
            throw('baseBlock "' + decl.baseBlock + '" for "' + decl.block + '" is undefined');

        props || (props = {});

        var baseBlock = blocks[decl.baseBlock || decl.block] || this;
            block = inherit(base, props, staticProps);

        block._name = name;

        return block;
    },

    create : function(name, params) {
        return new blocks[name](params);
    }

});

return App;

}());