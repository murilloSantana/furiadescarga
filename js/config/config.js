
app.config(function($stateProvider,$urlRouterProvider,BackandProvider,$httpProvider){

  BackandProvider.setAppName('furiadescarga');

  $httpProvider.interceptors.push('httpInterceptor');

  $urlRouterProvider.otherwise("/login");

  $stateProvider.state("login",{url:"/login",templateUrl:"views/login.html",controller:"loginCtrl"})
  .state("jogador",{url:"/jogador",templateUrl:"views/jogador/jogador.html",controller:"jogadorCtrl",controllerAs:"vm"})
  .state("rodada",{url:"/rodada",templateUrl:"views/rodada/rodada.html",controller:"rodadaCtrl"})
  .state("regra",{url:"/regra",templateUrl:"views/regra/regra.html",controller:"regraCtrl",controllerAs:"vm"});
});
