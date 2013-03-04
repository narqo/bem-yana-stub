function log(data) {
    console.log('----->');
    console.log(JSON.stringify(data, null, 2));
}

var json = require('./desktop.bundles/index/index.bemtree.xjst').BEMTREE.call({ d : 0 });

json.then(log);