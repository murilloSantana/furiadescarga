(function() {

  app.controller("regraCtrl",regraCtrl);
  regraCtrl.$inject = ["$scope","userAPI","regraAPI","Backand"];

  function regraCtrl($scope,userAPI,regraAPI,Backand) {
    var vm = this;

    vm.editarAtivado = false;
    $scope.form = {};
    vm.regra = {};
    vm.regras = {};

    function listarRegra(){
      regraAPI.listarRegra().then(function(response){
        vm.regras = response.data.data;
      },function(response){

      });
    };

    vm.salvarRegra = function(regra){
      Backand.getUserDetails().then(function(response) {
        var user = response;
        userAPI.buscarUser(user.username).then(function(response) {
          var dataCreate = new Date();
          regra["data_created"] = dataCreate.toUTCString();
          var id = response.data.data[0].id;
          regra["users"] = id;

          regraAPI.salvarRegra(regra).then(function(response){
            vm.regra = {};
            $scope.form.formRegra.$setPristine();
            listarRegra();

          },function(response) {

          });

          //retorna erro ao buscar o id do usuario
        },function(response) {

        })
        //retorna erro ao buscar dados do usuario logado
      },function(response) {

      });

    };

    vm.editarRegra = function(regra) {
      regraAPI.editarRegra(regra).success(function(response){
        vm.regra = {};
        $scope.form.formRegra.$setPristine();
        vm.editarAtivado = false;
        listarRegra();

      }).error(function(response) {
      });
    };

    vm.carregarEditar = function(regra){
      vm.regra = regra;
      vm.regra.posicao = parseInt(vm.regra.posicao);
      vm.editarAtivado = true;
    };
    vm.cancelarEditar = function(){
      vm.regra = {};
      $scope.form.formRegra.$setPristine();
      vm.editarAtivado = false;
      listarRegra();
    };

    vm.excluirRegra = function(regra){
      regraAPI.excluirRegra(regra.id).success(function(response){
        listarRegra();
      }).error(function(response){

      })
    };

    listarRegra();

  };
})();
