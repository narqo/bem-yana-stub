BEM.DOM.decl('b4', {
    onSetMod : {
        'js' : {
            'inited' : function() {
                BEM.create(
                        'i-handler__request',
                        { _ : 'photos', error : 'internal' })
                    .run()
                    .then(
                        this._onPhotosGot.bind(this),
                        this._onPhotosFailed.bind(this)
                    );
            }
        }
    },

    _onPhotosGot : function(photos) {
        BEM.DOM.update(this.domElem, '(client-side) b4 got result:<br/>' + JSON.stringify(photos, null, 2));
    },

    _onPhotosFailed : function(err) {
        BEM.DOM.update(this.domElem, '(client-side) b4 got error:<br/>' + err.message);
    }
}, {

    live : true

});
