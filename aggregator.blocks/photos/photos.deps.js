({
    mustDeps : [
        { block : 'i-promise' },
        { block : 'i-bem' },
        { block : 'i-handler', elem : 'response' }
    ],
    shouldDeps : [
        { block : 'user-response', mods : { type : 'bulk' } }
    ]
})