(function(HANDLER) {

var events = require('events');

HANDLER.CommonProcessor = inherit(events.EventEmitter, {
    __constructor : function() {
        events.EventEmitter.call(this);
    }
});

}(BEM.HANDLER));
