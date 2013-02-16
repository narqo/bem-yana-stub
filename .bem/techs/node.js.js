exports.baseTechName = 'js';

exports.techMixin = {

    getSuffixes : function() {
        return ['node.js'];
    },

    getBuildSuffixes : function() {
        return ['common.js', 'node.js'];
    },

    getDependencies : function() {
        return ['bemtree.xjst'];
    }

};
