App.request = function() {

    normalize : function(req, res) {
        App.url.parse(req);
        App.url.parseQuery(req);
    }

};
