(function(HANDLER, _) {

var events = require('events');

HANDLER.CommonProcessor = _.inherit(events.EventEmitter, {
    __constructor : function() {
        events.EventEmitter.call(this);
    }
});

}(BEM.HANDLER, BEM.UTIL));
