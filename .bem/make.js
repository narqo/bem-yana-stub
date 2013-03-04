/*global MAKE:true */

require('./nodes');

var environ = require('./environ');

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

    getTechs: function() {
        if(~this.getNodePrefix().indexOf('desktop.bundles')) {
            return [
                'bemdecl.js',
                'deps.js',
//                'i18n',
                'bemhtml',
//                'i18n.bemtree.xjst',
                'bemtree.xjst',
//                'node.js'
            ];
        }

        return [
            'bemjson.js',
            'bemdecl.js',
            'deps.js',
            'js',
            'css',
            'ie.css',
            'ie6.css',
            'ie7.css',
            'ie8.css',
            'ie9.css',
            'bemhtml',
            'html'
        ];
    },

    'create-bemtree.xjst-optimizer-node' : function(tech, sourceNode, bundleNode) {
        return this['create-js-optimizer-node'].apply(this, arguments);
    },

    'create-bemtree.i18n.xjst-optimizer-node' : function(tech, sourceNode, bundleNode) {
        return this['create-js-optimizer-node'].apply(this, arguments);
    }

});
