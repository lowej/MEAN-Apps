var expect = require('chai').expect
var api = require('../../support/api')
var Post = require('../../../../models/post')
var user = require('../../support/user')

describe('controllers.api.posts', function () {
  beforeEach(function (done) {
    Post.remove({}, done)
  })
  describe('GET /api/posts', function () {

    beforeEach(function (done) {
      var posts = [
        {body: 'post1', username: 'jonathan'},
        {body: 'post2', username: 'jonathan'},
        {body: 'post3', username: 'jonathan'}
      ]
      Post.create(posts, done)
    })

    it('has 3 posts', function (done) {
      api.get('/api/posts')
      .expect(200)
      .expect(function (response) {
        expect(response.body).to.have.length(3)
      })
      .end(done)
    })
  })
  
  //Added by me to clean up after the test
  afterEach(function(done){
  
	  Post.remove({}, done)
  })
})


describe('POST /api/posts', function () {
  var token

  //Added by me to ensure no dodgy posts in DB before test runs
  beforeEach(function (done) {
	    Post.remove({}, done)
	  })
  
  beforeEach(function (done) {
    user.create('posttester', 'pass', function (err, user) {
      token = user.token
      done(err)
    })
  })

  beforeEach(function (done) {
    api.post('/api/posts')
    .send({body: 'this is my new post'})
    .set('X-Auth', token)
    .expect(201)
    .end(done)
  })

  it('added 1 new post', function (done) {
    Post.findOne(function (err, post) {
      expect(post.body).to.equal('this is my new post')
      done(err)
    })
  })
  
  //Added by me to clean up after the test
   afterEach(function(done){
  
	  Post.remove({}, done)
	  
  })
})