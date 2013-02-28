var PATH = require('path'),
    BEM = require('bem'),
    environ = require('../../.bem/environ');

exports.baseLevelPath = require.resolve('../../.bem/levels/blocks.js');

exports.getConfig = function() {

    return BEM.util.extend(this.__base() || {}, {

        bundleBuildLevels : [
                'bem-bl/blocks-common',
                'bem-bl/blocks-desktop',
                'bem-yana/app.blocks',
                'bem-yana/common.blocks',
            ]
            .map(PATH.resolve.bind(null, environ.LIB_ROOT))
            .concat([
                'common.blocks',
                'example.blocks'
            ].map(PATH.resolve.bind(null, environ.PRJ_ROOT)))

    });

};
