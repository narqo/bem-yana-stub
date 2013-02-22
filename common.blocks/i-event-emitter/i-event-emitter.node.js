var EventEmitter = (function() {

var events = require('events');

return inherit(events.EventEmitter, {
    __constructor : function() {
        events.EventEmitter.call(this);
    }
});

}());