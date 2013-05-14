(function(HANDLER, UTIL) {

HANDLER.declResponse('bulk-comments', {
    run : function() {
        var res = {},
            promise = Vow.promise();

        this._params.ids.forEach(function(id) {
            res[id] = { id : id, comment : 'comment' + id, uid : id };
        });

        setTimeout(function() {
            promise.fulfill(res);
            //promise.reject(Error('internal'));
        }, 1000);

        return promise.then(this._onCommentsDone.bind(this));
    },

    _onCommentsDone : function(comments) {
        this._comments = comments;
        return this._getCommentUsers().then(this._insertUsers.bind(this));
    },

    _getCommentUsers : function() {
        return this._runHandler(
            'bulk-users',
            {
                ids : Object.keys(this._comments).map(
                    function(id) {
                        return this._comments[id].uid;
                    },
                    this)
            });
    },

    _insertUsers : function(users) {
        Object.keys(this._comments).map(
            function(id) {
                var comment = this._comments[id];
                comment.user = users[comment.uid];
                delete comment.uid;
            },
            this);

        return this._comments;
    }
}, {
    isBulk : function() {
        return true;
    },

    mergeParams : function(params) {
        return params.reduce(
            function(res, params) {
                res.ids = UTIL.unique(res.ids.concat(params.ids));
                return res;
            },
            { ids : [] });
    },

    getFutureHandlers : function() {
        return ['bulk-users'];
    }
});
}(BEM.HANDLER, BEM.UTIL));