/**
 * Технология `priv.js` включающая код технологий `common.js`, `bemtree.xjst`
 */

var BEM = require('bem'),
    Q = BEM.require('q');

exports.baseTechName = 'js';

exports.techMixin = {

    getSuffixes : function() {
        return ['common.js', 'bemtree.xjst', 'bemhtml'];
    },

    getBuildSuffixes : function() {
        return ['priv.js'];
    },

    getBuildResult : function(prefixes, suffix, outputDir, outputName) {
        var _this = this,
            suffixes = this.getSuffixes();

        return this.__base(prefixes, suffixes.shift(), outputDir, outputName)
            .then(function(common) {
                suffixes.forEach(function(suffix) {
                    suffix += '.js';
                    common.push(_this.getBuildResultChunk('_' + outputName + '.' + suffix, null, null));
                });
                return common;
            });
    },

    getDependencies : function() {
        return ['bemhtml', 'bemtree.xjst'];
    }

};
