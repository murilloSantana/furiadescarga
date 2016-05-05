(function() {

  app.controller("loginCtrl",loginCtrl);
  loginCtrl.$inject = ["$scope","userAPI"];

  function loginCtrl($scope,userAPI){

    $scope.erroLogin = false;



    $scope.login = function(usuario){
      userAPI.login(usuario);
    }


  };



})()
