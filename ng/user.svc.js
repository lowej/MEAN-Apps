angular.module('app')
.service('UserSvc', function ($http) {
  var svc = this
  svc.getUser = function () {
    return $http.get('/api/users')
   }

//angular.module('app')
//.service('UserSvc', function ($http) {
//  var svc = this
//  svc.getUser = function () {
//   return $http.get('/api/users', {
//      headers: { 'X-Auth': this.token }
//    }).then(function (response) {
//      return response.data
//    })
//  }
 
  
  //Login function
  svc.login = function (username, password) {
    return $http.post('/api/sessions', {
      username: username, password: password
    }).then(function (val) {
      svc.token = val.data
      $http.defaults.headers.common['X-Auth'] = val.data
      return svc.getUser()
    })
  }
  
  //ADDED THIS FUNCTION TO THE USER SERVICE
  svc.register = function(username, password) {
  	return $http.post('/api/users', {
      username: username, password: password
    }).then(function(){
    	return svc.login(username, password)
    })
  }
  
})

