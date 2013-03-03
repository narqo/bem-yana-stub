(function() {

var path = require('path'),
    url = require('url'),

    ROOT = App.Config.param('PRJ_ROOT'),
    bundleDir = path.relative(ROOT, __dirname) + path.sep;

App.Config.params({

    DEBUG : true,

    STATIC_URL : url.resolve('http://127.0.0.1:8080/', bundleDir)

});

}());
