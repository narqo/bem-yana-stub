var PATH = require('path'),
    BEM = require('bem'),
    Q = BEM.require('q');

var CommonJsMixin = exports.CommonJsMixin = {

    getBuildSuffixesMap : function() {
        return this.getBuildSuffixes().reduce(function(decl, suffix) {
            decl[suffix] = [suffix];
            return decl;
        }, {});
    },

    getCommonBuildResult : function(prefixes, suffix, outputDir, outputName) {
        var _t = this;
        return Q.when(this.filterPrefixes(prefixes, this.getBuildSuffixesMap()[suffix]), function(paths) {
            return Q.all(paths.map(function(path) {
                return _t.getBuildResultChunk(PATH.relative(outputDir, path), path, suffix);
            }));
        });
    },

    getBuildResult : function(prefixes, suffix, outputDir, outputName) {
        return this.getCommonBuildResult.apply(this, arguments);
    }

};
