function log(data) {
    console.log(JSON.stringify(data, null, 2));
}

require('./desktop.bundles/index/index.bemtree.xjst').BEMTREE.call({ d : 0 }, { callback : log });
