/*global MAKE:true */

require('./nodes/arch');

MAKE.decl('Arch', {

    blocksLevelsRegexp: /^.+?\.blocks$/,

    bundlesLevelsRegexp: /^.+?\.bundles$/,

    libraries : [ 'bem-bl' ]

});


MAKE.decl('BundleNode', {

    getTechs: function() {
        if(~this.getNodePrefix().indexOf('desktop.bundles')) {
            return [
                'bemdecl.js',
                'deps.js',
                'i18n',
                'bemhtml',
                'bemtree.xjst',
                'node.js'
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

    'create-node.js-optimizer-node' : function(tech, sourceNode, bundleNode) {
        return this['create-js-optimizer-node'].apply(this, arguments);
    },

    'create-bemtree.xjst-optimizer-node' : function(tech, sourceNode, bundleNode) {
        return this['create-js-optimizer-node'].apply(this, arguments);
    },

    'create-bemtree.i18n.xjst-optimizer-node' : function(tech, sourceNode, bundleNode) {
        return this['create-js-optimizer-node'].apply(this, arguments);
    }

});
