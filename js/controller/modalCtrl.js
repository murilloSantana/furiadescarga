(function() {
  app.controller("modalCtrl",modalCtrl);
  modalCtrl.$inject = ["$scope","$uibModalInstance","jogadorAPI","rodadaAPI","regraAPI","itens","userAPI","Backand","$rootScope"];


  function modalCtrl($scope, $uibModalInstance,jogadorAPI,rodadaAPI,regraAPI,itens,userAPI,Backand,$rootScope) {

    var vm = this;

    vm.numeroRodadas = itens;
    vm.listaJogadores={};
    vm.listaDadosRodada=[];
    vm.salvando = false;

    function listarRegra(){
      regraAPI.listarRegra().success(function(response){
        vm.regras = response.data;
      }).error(function(response){

      });
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    function carregarJogadores(){
      jogadorAPI.listar().success(function(response){
        vm.listaJogadores = response.data;
      }).error(function(response){

      });
    };



    vm.isExists = function(numero){
      return  rodadaAPI.isExists(numero).then(function(response) {
        var existe;
        if(response.data.data.length > 0){
          existe = true;
        }else{
          existe = false ;
        }
        return existe;
      },function() {
        return false;
      });
    };

    vm.salvarRodada = function(numeroRodada){
      var dataCreate = new Date();
      vm.salvando = true;

      Backand.getUserDetails().then(function(response) {
        var user = response;

        userAPI.buscarUser(user.username).then(function(response) {
          var id_user = response.data.data[0].id;

          var rodada = {"numero":numeroRodada,"data_created":dataCreate.toUTCString(),"users":id_user};

          vm.isExists(numeroRodada).then(function(existe) {

            if(existe){
              alert("Já existe essa rodada");
            }else {

              //salvando a rodada
              rodadaAPI.salvarRodada(rodada).success(function(response) {
                var pagamento = false;
                for (var i = 0; i < vm.listaDadosRodada.length; i++) {

                  if(vm.regras[i].taxa == 0){
                    pagamento = true;
                  }else{
                    pagamento = false;
                  }

                  var rodada = {
                    "pagamento":pagamento,
                    "debito":vm.regras[i].taxa,
                    "posicao":i+1,
                    "data_created":dataCreate.toUTCString(),
                    "id_jogador":vm.listaDadosRodada[i].id,
                    "id_rodada":parseInt(response['__metadata'].id),
                    "users":id_user
                  }
                  console.log(rodada)
                  //salvando jogarRodada
                  rodadaAPI.salvarJogadorRodada(rodada).success(function() {
                    location.reload();
                    //erro ao salvar jogadorRodada
                  }).error(function(response) {
                    console.log(response)
                  });

                };
                //erro ao salvar rodada
              }).error(function(response) {

              });

            }
          });
        });

      });
    };

    listarRegra();
    carregarJogadores();
  };
})();
