var PATH = require('path'),
    BEM = require('bem'),
    environ = require('../environ'),
    CommonJsMixin = require('./common.js.js').CommonJsMixin,
    Q = BEM.require('q');

exports.baseTechPath = environ.getLibPath('bem-yana', '.bem/techs/node.js.js');

exports.techMixin = BEM.util.extend({}, CommonJsMixin, {

    getSuffixes : function() {
        return ['common.js', 'node.js', 'bemtree.xjst', 'bemhtml'];
    },

    getBuildSuffixes : function() {
        return ['node.js'];
    },

    getDependencies : function() {
        return ['bemtree.xjst', 'bemhtml'];
    },

    getBuildSuffixesMap : function() {
        return {
            'node.js' : ['common.js', 'node.js']
        };
    },

    getBuildResult : function(prefixes, suffix, outputDir, outputName) {
        var _t = this,
            // XXX: ugly
            xjsts = this.getSuffixes().splice(2);

        return this.getCommonBuildResult.apply(this, arguments)
            .then(function(common) {
                return common.concat(xjsts.map(function(suffix) {
                    suffix += '.js';
                    return _t.getBuildResultChunk('_' + outputName + '.' + suffix, null, null);
                }));
            });
    }

});
