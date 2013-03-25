(function() {

var path = require('path'),
    url = require('url'),

    ROOT = Yana.Config.param('PRJ_ROOT'),
    bundleDir = path.relative(ROOT, __dirname) + path.sep;

Yana.Config.params({

    DEBUG : true,

    STATIC_URL : url.resolve('http://127.0.0.1:8080/', bundleDir)

});

}());