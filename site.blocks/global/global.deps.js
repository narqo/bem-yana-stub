({
    mustDeps : [
        { block : 'config' },
        { block : 'http' },
        { block : 'logger' }
    ],
    shouldDeps : [
        { block : 'page' },
        { block : 'page', mods : { action : 'index' } },
        { block : 'view', elem : 'static' }
    ]
})