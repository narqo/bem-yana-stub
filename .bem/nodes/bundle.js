require('bem/lib/nodesregistry').decl('BundleNode', {

    'create-app.node.js-optimizer-node' : function(tech, sourceNode, bundleNode) {
        return this['create-node.js-optimizer-node'].apply(this, arguments);
    },

    'create-client.js-optimizer-node' : function(tech, sourceNode, bundleNode) {
        return this['create-js-optimizer-node'].apply(this, arguments);
    },

    'create-bemtree.xjst-optimizer-node' : function() {
        return this['create-js-optimizer-node'].apply(this, arguments);
    },

    'create-bemtree.i18n.xjst-optimizer-node' : function() {
        return this['create-js-optimizer-node'].apply(this, arguments);
    },

    'create-bemtree.i18n.xjst-optimizer-node' : function() {
        var nodes = this.__base.apply(this, arguments);

        ['bemhtml', 'bemtree.xjst'].forEach(function(t) {
            this.ctx.arch.link(this.getBundlePath(t), nodes);
        }, this);

        return nodes;
    }

});