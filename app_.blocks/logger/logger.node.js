App.logger = {

    _util : require('util'),

    log : function() {
        console.log(this._util.format.apply(null, arguments));
    }

};