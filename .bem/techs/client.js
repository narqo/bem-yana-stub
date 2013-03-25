var PATH = require('path'),
    BEM = require('bem'),
    environ = require('../environ'),
    CommonJsMixin = require('./common.js.js').CommonJsMixin;

exports.baseTechName = 'js';

exports.techMixin = BEM.util.extend({}, CommonJsMixin, {

    getSuffixes : function() {
        return ['common.js', 'js'];
    },

    getBuildSuffixes : function() {
        return ['js'];
    },

    getDependencies : function() {
        return [];
    },

    getBuildSuffixesMap : function() {
        return {
            'js' : ['common.js', 'js']
        };
    }

});
