/*global node: true */

(function(global, BEM, Vow) {

var DNS = require('dns'),
    HTTP = require('http'),
    HTTPS = require('https'),
    URL = require('url'),
    QS = require('querystring'),
    ZLIB = require('zlib'),

    // DNS cache resolved
    cache = [];

/*

BEM.create('http-provider', {
        url : 'https://api.twitter.com/1/trends/1.json',
        method : 'GET',
        timeout : 300
    })

BEM.create('http-provider', {
        url : {
            protocol : 'https',
            port : 80,
            host : 'yandex.ru',
            path : '/'
        },
        method : 'GET',
        timeout : 300,
        allowGzip : false
    })

*/

BEM.decl({ block : 'http-provider' }, {

    onSetMod : {
        'js' : {
            'inited' : function() {
                var params = this.params,
                    url = params.url,
                    parsedUrl = typeof url === 'string'?
                            URL.parse(url, true) : url;

                this._hasBody = params.method === 'POST' || params.method === 'PUT';
                this._redirCounter = params.maxRedirects;

                this._url = parsedUrl;
            }
        }
    },

    run : function() {
        var params = this.params,
            hasBody = this._hasBody,
            body = hasBody? QS.stringify(params.data) : '';

        return this._resolveHostname()
            .then(function(ip) {
                var url = this._url,
                    query = QS.stringify(
                                hasBody? url.query : $.extend(url.query, params.data)),
                    options = {
                        method   : params.method,
                        auth     : params.auth,
                        headers  : $.extend(
                                params.headers,
                                hasBody?
                                    {
                                        'Content-Type'   : 'application/x-www-form-urlencoded',
                                        'Content-length' : Buffer.byteLength(body)
                                    } :
                                    {}),
                        protocol : url.protocol,
                        hostname : url.hostname,
                        port     : url.port,
                        path     : url.pathname + (query? '?' + query : '')
                    };

                if(ip) {
                    options.hostname = ip;
                    options.headers['Host'] = url.hostname;
                }

                if(params.allowGzip) {
                    var enc = options.headers['Accept-Encoding'];
                    if(!enc) {
                        enc = 'gzip, *';
                    } else if(!~enc.indexOf('gzip')) {
                        enc = 'gzip, ' + enc;
                    }

                    options.headers['Accept-Encoding'] = enc;
                }

                return this._doHttp(options, params.dataType, body);
            }.bind(this));
    },

    abort : function() {
        this._curReq && this._curReq.abort();
    },

    _resolveHostname : function() {
        var host = this._url.hostname;

        if(cache[host]) {
            return Vow.promise(cache[host]);
        }

        var promise = Vow.promise();

        DNS.resolve(host, function(err, addrs) {
            if(err) {
                return promise.reject(err);
            }

            var ip = addrs[0];
            promise.fulfill(cache[host] = ip);

            return;
        });

        return promise;
    },

    _doHttp : function(params, dataType, body) {
        console.log(params);
        var _t = this,
            promise = Vow.promise();

        this._curReq = (params.protocol === 'https:'? HTTPS : HTTP).request(
                params,
                function(res) {
                    if(res.statusCode === 301 || res.statusCode === 302) {
                        return --_t._redirCounter?
                            // TODO: testme
                            promise.sync(_t._doHttp(URL.parse(res.headers['location'], true), dataType)) :
                            promise.reject(new Error(500, 'too many redirects'));
                    }
                    else if(res.statusCode >= 400) {
                        return promise.reject(new Error(res.statusCode));
                    }

                    var buf = '',
                        headers = res.headers,
                        zdecoder = getDecoderFromHeaders(headers),
                        resStream = zdecoder?
                                res.pipe(new zdecoder()) :
                                    (res.setEncoding(_t.params.encoding), res);

                    resStream
                        .on('data', function(chunk) {
                            buf += chunk;
                        })
                        .once('end', function() {
                            try {
                                var dtype = _t._dataType || getDataTypeFromHeaders(headers);
                                promise.fulfill(processResponse(buf, dtype));
                            }
                            catch(err) {
                                promise.reject(err);
                            }
                        })
                        .once('close', function() {
                            promise.reject(new Yana.HttpError(500, 'connection closed'));
                        });
                });

        this.params.timeout &&
            this._curReq.setTimeout(this.params.timeout);

        body && this._curReq.write(body);

        this._curReq
            .once('error', function(e) {
                promise.reject(e);
            })
            .once('timeout', function(e) {
                this.abort();
                promise.reject(new Yana.HttpError(504, 'request timeout'));
            })
            .end();

        return promise;
    },

    getDefaultParams : function() {
        return $.extend(this.__base(), {
            'method'       : 'GET',
            'encoding'     : 'utf8',
            'maxRedirects' : 5,
            'timeout'      : null,
            'allowGzip'    : true
        });
    }

});

function getDataTypeFromHeaders(headers) {
    var contentType = headers['content-type'];
    if(contentType.indexOf('json') > -1) {
        return 'json';
    }

    return 'text';
}

function getDecoderFromHeaders(headers) {
    var encoding = headers['content-encoding'];
    switch(encoding) {

    case 'gzip':
        return ZLIB.Gunzip;

    case 'deflate':
        return ZLIB.Inflate;

    }
}

function processResponse(data, dataType) {
    switch(dataType) {
        case 'json':
            return JSON.parse(data);

        default:
            return data;
    }
}

}(this, BEM, Vow));