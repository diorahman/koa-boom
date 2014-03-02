var koa = require ('koa');
var boom = require ('./');
var app = koa ();

app.use (function * (next) {
  boom.badRequest(this, 'custom message');
});

var request = require('supertest').agent(app.listen());

describe('Boom', function () {
  it('Bad bad request', function(done){
    request
    .get ('/')
    .expect(400)
    .expect('custom message', done);
  });
});
