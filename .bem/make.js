/*global MAKE:true */

require('./nodes');

var PATH = require('path'),
    environ = require('./environ');

try {
    require(environ.getLibPath('bem-yana', '.bem/nodes/bundle'));
} catch(e) {
    if(e.code !== 'MODULE_NOT_FOUND')
        throw e;
}


MAKE.decl('Arch', {

    blocksLevelsRegexp: /^.+?\.blocks$/,

    bundlesLevelsRegexp: /^.+?\.bundles$/,

    libraries : [ 'bem-bl', 'bem-yana' ]

});


MAKE.decl('BundleNode', {

    getTechs : function() {
        /*
        var prefix = this.getNodePrefix();
        if(~prefix.indexOf('desktop.bundles/appserver')) {
            return [
                'bemdecl.js',
                'deps.js',
                'app.node.js'
            ];
        }
        */

        return [
            'bemdecl.js',
            'deps.js',
            'js',
            'css',
            'bemhtml',
            'bemtree.xjst',
            'node.js'
        ];
    },

    'create-app.node.js-optimizer-node' : function(tech, sourceNode, bundleNode) {
        return this['create-node.js-optimizer-node'].apply(this, arguments);
    },

    'create-bemtree.xjst-optimizer-node' : function(tech, sourceNode, bundleNode) {
        return this['create-js-optimizer-node'].apply(this, arguments);
    },

    'create-bemtree.i18n.xjst-optimizer-node' : function(tech, sourceNode, bundleNode) {
        return this['create-js-optimizer-node'].apply(this, arguments);
    }

});
