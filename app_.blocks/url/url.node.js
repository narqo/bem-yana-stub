App.url = {

    _url : require('url'),

    _qs : require('querystring'),

    parse : function(req) {
        var parsed = req._parsedUrl;
        if(parsed && parsed.href === req.url) {
            return parsed;
        }

        return req._parsedUrl = this._url.parse(req.url);
    },

    parseQuery : function(req, res) {
        req.query ||
            (req.query = ~req.url.indexOf('?')?
                    this._qs.parse(this.parse(req).query) : {});
    }

};
