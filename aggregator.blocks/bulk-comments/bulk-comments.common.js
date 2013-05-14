(function(global, BEM, Vow) {

BEM.decl({ block : 'bulk-comments', baseBlock : 'i-handler__response' }, {

    run : function() {
        var res = {},
            promise = Vow.promise();

        this.params.ids.forEach(function(id) {
            res[id] = { id : id, comment : 'comment' + id, uid : id };
        });

        setTimeout(function() {
            promise.fulfill(res);
            //promise.reject(Error('internal'));
        }, 500);

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
        var _t = this;
        return params.reduce(
            function(res, params) {
                res.ids = _t._.unique(res.ids.concat(params.ids));
                return res;
            },
            { ids : [] });
    },

    getFutureHandlers : function() {
        return ['bulk-users'];
    }

});

}(this, BEM, Vow));