Yet Another Node Application Stub done BEM
==========================================

This a set of configs and other stuff to start developing dynamic BEM project.

Usage
-----

    › git clone git://github.com/narqo/bem-yana-stub.git project
    › cd project
    › npm install
    › bem make vendor           # ⟵ please, note `vendor` target here

This will install all project's dependencies from NPM registry, so as dowload all the necessary BEM libraries,
e.g. [bem-bl](github.com/bem/bem-bl) and [bem-yana](http://github.com/narqo/bem-yana).

Then, let's build all the stuff

    › bem make

And now, we are ready to start our local dev-server

    › npm start
    ...
    Server started on port 3001

With `npm start` local dev-server will fire up under HTTP port `3001`. So you could navigate
to `http://localhost:3001/`.

**NOTE:**

`bem` should be in your `PATH` environment variable. You could do this by adding this line to your user's
`.profile` config:

    exports PATH=./node_modules/.bin:$PATH


---

BEM is abbreviation for Block-Element-Modifier. It's a way to write code which is easy to support and develop.

For more info about BEM metodology see [bem.info](http://bem.info/).

