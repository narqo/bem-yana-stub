BEM.DOM.decl('b-aggregat', {

    onSetMod : {
        'loading' : {
            'yes' : function(modName, modVal) {
                var page = this.findBlockOutside('b-page');
                ['b1', 'b2', 'b3', 'b4'].forEach(function(block) {
                    page.findBlockInside(block);
                });
            }
        }
    },

    _onClick : function(e) {
        e.preventDefault();

        this.hasMod('loading', 'yes') ||
            this.setMod('loading', 'yes');
    }

}, {

    live : function() {
        this.liveBindTo('click', function(e) {
            this._onClick(e);
        });
    }

});