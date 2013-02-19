var PATH = require('path'),
    BEM = require('bem'),
    environ = require('../../.bem/environ');

exports.baseLevelPath = require.resolve('../../.bem/levels/blocks.js');

exports.getConfig = function() {

    return BEM.util.extend(this.__base() || {}, {

        bundleBuildLevels : [
                'bem-bl/blocks-common',
                'bem-yana/app.blocks',
                'bem-yana/common.blocks',
            ]
            .map(PATH.resolve.bind(null, environ.LIB_ROOT))
            .concat(this.resolvePaths([
                '../../common.blocks',
                '../../site.blocks',
                '../../desktop.blocks',
            ]))

    });

};
