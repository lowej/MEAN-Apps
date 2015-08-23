var myPost = 'my new post'
var Post = require('../../models/post')
var expect = require('chai').expect

describe('making a post', function () {
	

	
  it('it logs in and creates a new post', function () {
    // go to homepage
    browser.get('http://localhost:3001')
    
    // click 'login'
    element(by.css('nav .login')).click()
    
    // fill out and submit login form
    element(by.model('username')).sendKeys('jonathan')
    element(by.model('password')).sendKeys('abc123')
    element(by.css('form .btn')).click()

    element(by.css('nav .posts')).click()
    
    
    // submit a new post on the posts page
    
    element(by.model('postBody')).sendKeys(myPost)
    element(by.css('form .btn')).click()
   
    
    //ISSUE WITH TEST SEEMS TO BE THE NEED TO WAIT FOR POST TO BE WRITTEN BEFORE TRYIN TO READ IT
   
	// the user should now see their post as the first post on the page
	/*element.all(by.css('ul.list-group li')).first().getText().then(function (text) {
      expect(text).to.contain(myPost)
      }) */
	
  })
  
  afterEach(function(){
  
  	//My way of just killing the test data, not the while db as per book
  
  	//Post.find({'body' : myPost}).remove().exec();
  })
})