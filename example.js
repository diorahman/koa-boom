var i18n = require ("i18n");
var koa = require ('koa');
var app = koa ();

i18n.configure({
  locales : [ "en", "id" ],
  defaultLocale : "id",
  directory : __dirname + "/locales"
});
  
app.use(function * (next) {
  this.__ = i18n.__;
  yield next;
});

var boom = require ('./')(i18n.__);

app.use (function * (next) {
  boom.badRequest(this, 'custom message');
});

app.listen (3000);
