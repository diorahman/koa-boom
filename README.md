# koa-boom

Using [boom](https://github.com/spumko/boom) inside koa context

```
$ npm install koa-boom --save
```

```js
var koa = require ('koa');
var boom = require ('koa-boom');
var app = koa ();

app.use (function * (next) {
  boom.badRequest(this, 'custom message');
});

app.listen (3000);

```

# LICENSE 

MIT