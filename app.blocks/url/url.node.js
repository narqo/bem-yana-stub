App.Url = inherit({ }, {

    parse : function(url) {
        return this._url.parse(url);
    },

    _url : require('url'),

    _qs : require('querystring')

});