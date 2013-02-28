(function(HANDLER) {

var HTTPS = require('https'),
    URL = require('url');

HANDLER.declResponse('github', {

   run : function() {
       return this._getData();
   },

   _getData : function() {
       var promise = Vow.promise(),
           apiurl = this.__self._getApiUrl(this._params),
           data = '';

       if(apiurl === false)
           return data;

       HTTPS.get(URL.parse(apiurl), function(res) {
           res.setEncoding('utf8');
           res
               .on('data', function(d) {
                   data += d;
               })
               .on('end', function() {
                   promise.fulfill(JSON.parse(data));
               })
               .on('error', function(err) {
                   promise.reject(err);
               });
       });

       return promise;
   }

}, {

    _getApiUrl : function(params) {
        if(!params)
            return false;

        return this._getHost() + this._getMembersUrlScheme().replace(/(?:\:([^\/]+))/g,
                function(match, token) {
                    return params[token] || token;
                });
    },

    _getHost : function() {
        return 'https://api.github.com';
    },

    _getMembersUrlScheme : function() {
        return '/orgs/:org/members';
    },

    _getReposUrlScheme : function() {
        return '/orgs/:org/repos';
    },

});

}(BEM.HANDLER));