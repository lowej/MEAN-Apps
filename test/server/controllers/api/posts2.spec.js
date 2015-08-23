var request = require('supertest')
var express = require('express')
var app = express()

app.get('/user', function(req, res){
  res.status(200).send({ name: 'jonathan' })
})

describe('GET /users', function () {
  it('responds with proper json', function (done) {
    request(app)
    .get('/user')
    .expect('Content-Type', /json/)
    .expect({name:'jonathan'}, done)
  })
})

