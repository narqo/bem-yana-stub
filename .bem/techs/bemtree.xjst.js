var BEM = require('bem'),
    PATH = require('path'),
    U = require('util'),
    Q = BEM.require('q');

exports.baseTechName = 'bemhtml';

exports.techMixin = {

    getSuffixes : function() {
        return ['bemtree.xjst'];
    },

    getBuildSuffixes : function() {
        return ['bemtree.xjst.js'];
    },

    getBuildResult : function(prefixes, suffix, outputDir, outputName) {
        return this.__base.apply(this, arguments)
            .then(this.wrapBuildResults.bind(this));
    },

    getBemtreeVar : function() {
        return 'BEMTREE';
    },

    wrapBuildResults : function(bemtree) {
        var bemtreeName = this.getBemtreeVar(),
            // FIXME: ugly
            bemtreeAsync = bemtree.replace(
                /xjst\.apply\.call\(([^,]+?)\);/m, 'xjst.applyAsync.call($1,options.callback);');

        return bemtreeAsync.replace(/BEMHTML/g, bemtreeName);  // FIXME: ugly hack!
    }

};
