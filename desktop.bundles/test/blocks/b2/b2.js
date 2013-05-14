BEM.DOM.decl('b2', {
    onSetMod : {
        'js' : {
            'inited' : function() {
                BEM.create(
                        'i-handler__request',
                        { _ : 'comments', param2 : 'val2' })
                    .run()
                    .then(
                        this._onCommentsGot.bind(this),
                        this._onCommentsFailed.bind(this)
                    );
            }
        }
    },

    _onCommentsGot : function(comments) {
        BEM.DOM.update(this.domElem, '(client-side) b2 got result:<br/>' + JSON.stringify(comments, null, 2));
    },

    _onCommentsFailed : function(err) {
        BEM.DOM.update(this.domElem, '(client-side) b2 got error:<br/>' + err.message);
    }
}, {

    live : true

});
