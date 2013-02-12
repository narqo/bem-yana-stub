({
    mustDeps : [
        { block : 'app' },
        { block : 'config' }
    ],
    shouldDeps : [
        { block : 'error', mods : { type : 'error' } },
        { block : 'logger' }
    ]
})