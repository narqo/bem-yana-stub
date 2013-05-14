(function() {

var config = Yana.Config;

config.params({

    'DEBUG' : true,

    'STATIC_URL' : '/a/',

    'STATIC_ROOT' : __dirname

});

// TODO: addRoute
config.param('routes').push({ rule : '/.+\.(?:css|js|ico)$', action : 'static' });

}());