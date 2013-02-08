App.logger = {

    _util : require('util'),

    log : function() {
        console.log.call(null, this._util.format.apply(null, arguments));
    }

};