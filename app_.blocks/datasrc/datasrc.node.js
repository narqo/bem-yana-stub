var blocks = {
    call : {
        'a' : {
            call : function(_, promise) {
                promise.fulfill('a done');
            }
        },

        'b' : {
            call : {
                'c' : {
                    call : function(_, promise) {
                        promise.fulfill('c is done!');
                    }
                }
            }
        },

        'smsimple' : {
            call : 'http',
            params : {
                url : 'https://smsimple.ru/metro/get_results.php',
                dataType : 'text'
            }
        }
    }
};


App.datasrc = {

    _jaggi : require('jaggi'),

    _createHandler : function() {
        var _t = this;
        return function(req, res) {
            return _t._getData.call(_t, req, res);
        };
    },

    _getData : function(req, res) {
        return this._jaggi.create(
                this._getBlocks(),
                {
                    require  : req,
                    response : res
                },
                {
                    root : App.config.get('dataSrcRoot')
                })
                .on('block-event', this._onBlockEvent.bind(this))
                .run()
                .then(function(data) {
                    App.logger.log(data);
                });
    },

    _getBlocks : function() {
        return blocks;
    },

    _onBlockEvent : function(event, data) {
        App.logger.log('block "%s" %s', event.meta.id, event.type);
    },

    create : function(params) {
        App.logger.log('DataSrc inited');
        return this._createHandler();
    }

};