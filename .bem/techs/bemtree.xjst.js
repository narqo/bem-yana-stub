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
        return Q.all([
                this.__base.apply(this, arguments),
                this.getBemhtml(outputDir, outputName, 'bemhtml')
            ])
            .spread(this.wrapBuildResults.bind(this));
    },

    getBemtreeVar : function() {
        return 'BEMTREE';
    },

    getBemhtmlVar : function() {
        return 'BEMHTML';
    },

    getBemhtml : function(dirname, name, suffix) {
        // FIXME: по какому пути нужно искать `file.bemhtml`?
        return U.format('var %s = require(require("path").resolve(__dirname, "%s")).BEMHTML;',
                    this.getBemhtmlVar(), this.getPath(name, suffix));
    },

//    getBemhtml : function(outputDir, outputName, suffix) {
//        return this.getBuildResultChunk(null,
//                this.getPath(PATH.join(outputDir, outputName), suffix));
//    },

    wrapBuildResults : function(bemtree, bemhtml) {
        var bemtreeName = this.getBemtreeVar(),
            bemhtmlName = this.getBemhtmlVar();

        // FIXME: ugly
        var bemtreeAsync = bemtree.replace(/xjst\.apply\.call\(([^,]+?)\);/m,
                'xjst.applyAsync.call($1);');

        return [
//            'var main = function(data) {',
            bemtreeAsync.replace(/BEMHTML/g, bemtreeName),  // FIXME: ugly hack!
//            bemhtml,
//            U.format('return { %s : %s, %s: %s }', bemhtmlName, bemhtmlName, bemtreeName, bemtreeName),
//            '};',
//            'typeof module === "undefined" || (module.exports = main());'
            ];
    },

    getDependencies : function() {
        return ['bemhtml'];
    }

};
