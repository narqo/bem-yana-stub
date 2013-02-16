({
    mustDeps : [
        { block : 'app' },
        { block : 'router' }
    ],
    shouldDeps : [
        { block : 'view' },
        { block : 'http', elem : 'error' }
    ]
})