exports.baseTechName = 'js';

exports.techMixin = {

    getSuffixes : function() {
        return ['node.js'];
    },

    getBuildSuffixes : function() {
        return ['node.js'];
    },

    getDependencies : function() {
        return ['i18n.bemtree.xjst'];
    }

};
