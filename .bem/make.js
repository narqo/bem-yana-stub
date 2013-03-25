/*global MAKE: true, node: true */

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

    getPathRel : function() {
        return PATH.relative(this.root, this.getPath());
    },

    getTechs : function() {
        var bundle = this.getPathRel(),
            level = this.getLevelPath();

        if(bundle === 'desktop.bundles/appserver') {
            return [
                'bemdecl.js',
                'deps.js',
                'app.node.js'
            ];
        }

        if(bundle === 'desktop.bundles/test') {
            return [
                'bemdecl.js',
                'deps.js',
                'css',
                'client.js',
                'bemhtml',
                'bemtree.xjst',
                'node.js'
                ];
        }

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

    getOptimizerTechs : function() {
        var bundle = this.getPathRel(),
            base = this.__base();

        base.concat(['bemhtml', 'bemtree.xjst']);

        return bundle === 'desktop.bundles/test'?
                base.concat(['client.js', 'node.js']) : base;
    },

    getLevels : function() {
        var bundle = this.getPathRel(),
            vendorLevels = [
                    'bem-bl/blocks-common',
                    'bem-bl/blocks-desktop',
                    'bem-yana/common.blocks',
                    'bem-yana/app.blocks'
                ]
                .map(function(path) {
                    return PATH.resolve(environ.LIB_ROOT, path);
                });

        if(bundle === 'desktop.bundles/test') {
            return vendorLevels.concat([
                    'common.blocks',
                    'aggregator.blocks',
                    'site.blocks',
                    'test.blocks'
                ].map(function(path) {
                    return PATH.resolve(environ.PRJ_ROOT, path);
                }))
                .concat([PATH.resolve(this.root, PATH.dirname(this.getNodePrefix()), 'blocks')]);
        }

        return this.__base.apply(this, arguments);
    }

});
