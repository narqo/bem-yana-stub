(function(HANDLER) {

HANDLER.declResponse('comments', {
    run : function() {
        return Vow.fulfill(stubData()).then(
            this._onCommentsDone.bind(this),
            this._onCommentsFailed.bind(this));
    },

    _onCommentsDone : function(comments) {
        this._comments = comments;
        return this._getCommentUsers().then(this._insertUsers.bind(this));
    },

    _onCommentsFailed : function(error) {
        this._releaseHandler('bulk-users');
        throw error;
    },

    _getCommentUsers : function() {
        return this._runHandler(
            'bulk-users',
            {
                ids : this._comments.map(function(comment) {
                    return comment.uid;
                })
            });
    },

    _insertUsers : function(users) {
        this._comments.forEach(function(comment) {
            comment.user = users[comment.uid];
            delete comment.uid;
        });

        return this._comments;
    }
}, {
    getFutureHandlers : function() {
        return ['bulk-users'];
    }
});

function stubData() {
    return [
        { cid : 1, uid : 11 },
        { cid : 2, uid : 12 },
        { cid : 3, uid : 13 },
        { cid : 4, uid : 11 }
    ];
}

}(BEM.HANDLER));
