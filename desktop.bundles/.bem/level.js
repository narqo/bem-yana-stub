var PATH = require('path'),
    BEM = require('bem'),
    environ = require('../../.bem/environ');

exports.baseLevelPath = require.resolve('../../.bem/levels/blocks.js');

exports.getConfig = function() {

    return BEM.util.extend(this.__base() || {}, {

        bundleBuildLevels : [
                'bem-bl/blocks-common',
                'bem-bl/blocks-desktop',
                'bem-yana/common.blocks',
                'bem-yana/app.blocks'
            ]
            .map(PATH.resolve.bind(null, environ.LIB_ROOT))
            .concat([
                'common.blocks',
                'aggregator.blocks',
                'site.blocks',
                'desktop.blocks'
            ].map(PATH.resolve.bind(null, environ.PRJ_ROOT)))

    });

};
