(function() {

  app.factory("userAPI",userAPI);
  userAPI.$inject = ["$http","$location","Backand"];

  function userAPI($http,$location,Backand){

    var _login = function(usuario){
      return Backand.signin(usuario.username,usuario.password).then(function(response) {
        $location.path("/jogador");
      },function(){
        alert("login ou senha incorretos");
      })
    };


    var _buscarUser = function(username) {
      return $http({
        method:'GET',
        url: Backand.getApiUrl() + "/1/objects/users",
        params: {
          filter: [{fieldName:"email", operator:"equals", value: username}],
        }
      })
    };
    var _logout = function() {
      Backand.signout().then(function () {
        //angular.copy({}, self.currentUser);
        $location.path("/login");
      });
    };

    return {
      login: _login,
      buscarUser:_buscarUser,
      logout:_logout
    }
  };




})();
