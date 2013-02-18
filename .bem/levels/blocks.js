var PATH = require('path'),
    environ = require('../environ'),

    join = PATH.join,
    resolve = PATH.resolve.bind(null, __dirname),

    PRJ_TECHS = resolve('../techs'),
    BEMBL_TECHS = environ.getLibPath('bem-bl', 'blocks-common/i-bem/bem/techs'),
    BEMYANA_TECHS = environ.getLibPath('bem-yana', '.bem/techs');


exports.getTechs = function() {

    return {
        'bemdecl.js'    : 'bemdecl.js',
        'deps.js'       : 'deps.js',
        'js'            : 'js-i',
        'css'           : 'css',
        'ie.css'        : 'ie.css',
        'ie6.css'       : 'ie6.css',
        'ie7.css'       : 'ie7.css',
        'ie8.css'       : 'ie8.css',
        'ie9.css'       : 'ie9.css',

        'bemjson.js'    : join(PRJ_TECHS, 'bemjson.js'),
        'bemtree.xjst'  : join(PRJ_TECHS, 'bemtree.xjst.js'),
        'i18n.bemtree.xjst' : join(PRJ_TECHS, 'i18n.bemtree.xjst.js'),

        'i18n'          : join(BEMBL_TECHS, 'i18n.js'),
        'bemhtml'       : join(BEMBL_TECHS, 'bemhtml.js'),
        'html'          : join(BEMBL_TECHS, 'html.js'),
        'i18n.html'     : join(BEMBL_TECHS, 'i18n.html.js'),

        'node.js'       : join(BEMYANA_TECHS, 'node.js')
    };

};

exports.defaultTechs = ['css', 'js', 'bemhtml'];
