Yat Another Node Application Stub done BEM
==========================================

### Usage

    › git clone git://github.com/narqo/bem-yana-stub.git project
    › cd project
    › npm install
    › bem make
    › npm start

This will install localy all project's dependencies from npm and build all the stuff.
With `npm start` local dev server will fire up under HTTP port `3000`. So you could navigate to `http://localhost:3000/`.

Query parameter `?_mode=json` is used to see BEMJSON stuff.

**NOTE:** `bem` should be in your `PATH` environment variable. You could do this by adding this line to your user's
`.profile` config:

    exports PATH=./node_modules/.bin:$PATH

---

BEM is abbreviation for Block-Element-Modifier. It's a way to write code which is easy to support and develop.

For more info about BEM metodology see [bem.info](http://bem.info/).

