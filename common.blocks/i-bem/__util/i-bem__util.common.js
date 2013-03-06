(function(global) {

BEM.UTIL = {

    nextTick : function(fn, ctx) {
        nextTick(fn.bind(ctx || this));
    },

    merge : function() {
        var res = {};

        for(var i = 0, len = arguments.length; i < len; i++) {
            var obj = arguments[i];
            if(obj) {
                for(var name in obj) {
                    obj.hasOwnProperty(name) && (res[name] = obj[name]);
                }
            }
        }

        return res;
    },

    unique : function(arr) {
        var res = [],
            i = arr.length;

        while(i--) {
            res.indexOf(arr[i]) < 0 && res.push(arr[i]);
        }

        return res;
    },

    isFunction : function(obj) {
        return toStr.call(obj) === '[object Function]';
    },

    noOp : function() {},

    pad : function(str, len, symbol) {
        return (str = '' + str).length < len?
            new Array(len - str.length + 1).join(symbol) + str :
            str;
    }

};

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
                };

}(this));