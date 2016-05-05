(function() {

  app.controller("jogadorCtrl",jogadorCtrl);
  jogadorCtrl.$inject = ["$scope","jogadorAPI","$timeout","userAPI","Backand"];


  function jogadorCtrl($scope,jogadorAPI,$timeout,userAPI,Backand){

    var vm = this;
    vm.editarAtivado = false;
    vm.erroJogador = false;
    vm.jogadores={};
    vm.jogador={};
    $scope.form={};


    function listarTodosJogadores(){
      jogadorAPI.listar().then(function(response){
        vm.jogadores = response.data.data;
      },function(){
      });
    };

    vm.salvarJogador = function(jogador){
      Backand.getUserDetails().then(function(response) {
        var user = response;
        userAPI.buscarUser(user.username).then(function(response) {
          var id = response.data.data[0].id;
          var dataCreate = new Date();
          jogador["data_created"] = dataCreate.toUTCString();
          jogador["users"] = id;

          jogadorAPI.salvarJogador(jogador).then(function(response) {

            vm.jogador={};
            $scope.form.formJogador.$setPristine();
            listarTodosJogadores();

            //retorno de erro ao salvar novo jogador
          },function() {

          });
          //erro ao retornar uma buscar do jogador
        },function() {

        })
        //retorno de erro do Backand API
      }, function(){

      });

    }
    vm.carregarEditar = function(jogador){
      vm.jogador = jogador;
      vm.editarAtivado = true;
    };
    vm.cancelarEditar = function(){
      vm.jogador = {};
      $scope.form.formJogador.$setPristine();
      vm.editarAtivado = false;
      listarTodosJogadores();

    };
    vm.editarJogador = function(jogador){
      var dataUpdated = new Date();
      jogador["data_updated"] = dataUpdated.toUTCString();

      jogadorAPI.editarJogador(jogador).success(function(response){
        vm.jogador = {};
        $scope.form.formJogador.$setPristine();
        vm.editarAtivado = false;
        listarTodosJogadores();
      }).error(function(){
        vm.erroJogador = true;
        $timeout(function () {
          vm.erroJogador = false;
        }, 1000);
      });
    };

    vm.excluirJogador = function(id){
      jogadorAPI.excluirJogador(id).success(function(response){
        listarTodosJogadores();
      }).error(function(response){

      });
    };

    listarTodosJogadores();

  };


})();
