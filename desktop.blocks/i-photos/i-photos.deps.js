({
    mustDeps : [
        { block : 'i-handler', elems : ['request', 'response'] }
    ],
    shouldDeps : [
        { elems : ['response'] },
        { block : 'i-comments' },
        { block : 'i-comments', elem : 'response', mods : { 'type' : 'bulk' } },
        { block : 'i-users' },
        { block : 'i-users', elem : 'response', mods : { 'type' : 'bulk' } }
    ]
})