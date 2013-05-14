/**
 * @fileOverview Логгер процессора для тестов
 */

(function(global, BEM) {

BEM.decl('i-handler__processor', {

    onSetMod : {
        'js' : {
            'inited' : function() {
                var base = this.__base.apply(this, arguments),
                    logger = this.__self.logger || console;

                this.on('run', function(e, data) {
                    logger.debug('Handler "%s" run%s',
                            data.handler,
                            typeof data.params !== 'undefined'?
                                    ' with params: ' + JSON.stringify(data.params) : '');
                })
                .on('success', function(e, data) {
                    logger.debug('Handler "' + data.handler + '" success');
                })
                .on('fail', function(e, data) {
                    logger.debug(
                        'Handler "%s" failed with error: %s',
                        data.handler,
                        data.error.message);
                });

                return base;
            }
        }
    }

});

}(this, BEM));
