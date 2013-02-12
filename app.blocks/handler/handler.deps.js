({
    mustDeps : [
        { block : 'app' }
    ],
    shouldDeps : [
        { block : 'router' },
        { block : 'view' },
        { block : 'http', elem : 'error' }
    ]
})