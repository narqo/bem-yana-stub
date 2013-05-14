(function(global, BEM) {

/**
 * Cross-platform `nextTick` implementation from
 * https://github.com/dfilatov/jspromise/
 * @type Function
 */
var nextTick = typeof process === 'object'? // nodejs
    process.nextTick :
    global.setImmediate? // ie10
        global.setImmediate :
        global.postMessage? // modern browsers
            (function() {
                var msg = '__bem' + +new Date,
                    onMessage = function(e) {
                        if(e.data === msg) {
                            e.stopPropagation && e.stopPropagation();
                            callFns();
                        }
                    };

                global.addEventListener?
                    global.addEventListener('message', onMessage, true) :
                    global.attachEvent('onmessage', onMessage);

                return function(fn) {
                    fns.push(fn) === 1 && global.postMessage(msg, '*');
                };
            })() :
            'onreadystatechange' in global.document.createElement('script')? // old IE
                (function() {
                    var createScript = function() {
                            var script = document.createElement('script');
                            script.onreadystatechange = function() {
                                script.parentNode.removeChild(script);
                                script = script.onreadystatechange = null;
                                callFns();
                            };
                            (global.document.documentElement || global.document.body).appendChild(script);
                        };

                    return function(fn) {
                        fns.push(fn) === 1 && createScript();
                    };
                })() :
                function(fn) { // old browsers
                    setTimeout(fn, 0);
                },
    fns = [],
    callFns = function() {
        var fnsToCall = fns, i = 0, len = fns.length;
        fns = [];
        while(i < len) {
            fnsToCall[i++]();
        }
    },

    util = {
        _ : {
            nextTick : function(fn, ctx) {
                nextTick(fn.bind(ctx || BEM.blocks['i-handler']));
            },

            unique : function(arr) {
                var res = [],
                    i = arr.length;

                while(i--) {
                    res.indexOf(arr[i]) < 0 && res.push(arr[i]);
                }

                return res;
            }
        }
    };


/**
 * FIXME: move to `i-bem__util`
 */
BEM.decl('i-handler', util, util);

}(this, BEM));
