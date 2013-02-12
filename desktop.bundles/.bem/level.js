var BEM = require('bem'),
    environ = require('../../.bem/environ');

exports.baseLevelPath = require.resolve('../../.bem/levels/blocks.js');

exports.getConfig = function() {

    return BEM.util.extend(this.__base() || {}, {

        bundleBuildLevels : [
                'blocks-common',
            ]
            .map(environ.getLibPath.bind(null, 'bem-bl'))
            .concat(this.resolvePaths([
                '../../common.blocks',
                '../../app.blocks',
                '../../site.blocks',
                '../../desktop.blocks'
            ]))

    });

};
