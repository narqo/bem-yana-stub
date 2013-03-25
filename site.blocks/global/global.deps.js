({
    mustDeps : [
        { block : 'config' },
        { block : 'http' },
        { block : 'logger' },
        { block : 'util' },
    ],
    shouldDeps : [
        { block : 'page' },
        { block : 'page', mods : { action : 'index' } }
    ]
})