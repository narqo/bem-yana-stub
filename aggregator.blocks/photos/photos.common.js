(function(global, BEM, Vow) {

BEM.decl({ block : 'photos', baseBlock : 'i-handler__response' }, {

    run : function() {
        return (this.params.error?
                Vow.reject(Error(this.params.error)) :
                Vow.fulfill(stubData())).then(
                    this._onPhotosDone.bind(this),
                    this._onPhotosFailed.bind(this));
    },

    _onPhotosDone : function(photos) {
        this._photos = photos;
        return Vow.all([
                this._getPhotoComments(),
                this._getPhotoUsers()
            ]).spread(
                this._insertCommentsAndUsers.bind(this));
    },

    _onPhotosFailed : function(error) {
        this._releaseHandler('bulk-comments');
        this._releaseHandler('bulk-users');

        throw error;
    },

    _getPhotoComments : function() {
        return this._runHandler(
            'bulk-comments',
            {
                ids : this._photos.map(function(photo) {
                    return photo.cid;
                })
            });
    },

    _getPhotoUsers : function() {
        return this._runHandler(
            'bulk-users',
            {
                ids : this._photos.map(function(photo) {
                    return photo.uid;
                })
            });
    },

    _insertCommentsAndUsers : function(comments, users) {
        this._photos.forEach(function(photo) {
            photo.comment = comments[photo.cid];
            photo.user = users[photo.uid];

            delete photo.cid;
            delete photo.uid;
        });

        return this._photos;
    }

}, {

    getFutureHandlers : function() {
        return ['bulk-users', 'bulk-comments'];
    }

});


function stubData() {
    return [
        { pid : 1, uid : 11, cid : 1 },
        { pid : 2, uid : 12, cid : 3 },
        { pid : 3, uid : 13, cid : 5 },
        { pid : 4, uid : 11, cid : 7 }
    ];
}

}(this, BEM, Vow));
