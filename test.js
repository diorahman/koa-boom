var koa = require ('koa');
var boom = require ('./')();
var request = require('supertest');

describe('Boom', function () {
  it('Bad bad request', function(done){

    var app = koa ();

    app.use (function * (next) {
      this.throw.apply(this, boom.badRequest('custom message'));
    });

    request
    .agent(app.listen())
    .get ('/')
    .expect(400)
    .expect('custom message', done);

  });

  it('Another bad bad request', function(done){

    var app = koa ();

    app.use (function * (next) {
      boom.badRequest(this, 'custom message');
    });

    request
    .agent(app.listen())
    .get ('/')
    .expect(400)
    .expect('custom message', done);

  });

  it('Yet another bad bad request', function(done){

    var app = koa ();

    app.use (function * (next) {
      boom.badRequest(this);
    });

    request
    .agent(app.listen())
    .get ('/')
    .expect(400)
    .expect('Bad Request', done);

  });

  it('Whoa, it\'s still another bad bad request', function(done){

    var app = koa ();

    app.use (function * (next) {
      this.throw.apply(this, boom.badRequest());
    });

    request
    .agent(app.listen())
    .get ('/')
    .expect(400)
    .expect('Bad Request', done);

  });

});
