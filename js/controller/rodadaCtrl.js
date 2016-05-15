(function() {
  app.controller("rodadaCtrl",rodadaCtrl);
  rodadaCtrl.$inject = ["$scope","userAPI","$uibModal","rodadaAPI"];



  function rodadaCtrl($scope,userAPI,$uibModal,rodadaAPI) {
    var vm = this;
    vm.numeroRodadas=[]
    vm.listaRodadas=[];
    vm.rodadaSelecionada;
    vm.rodadas;
    vm.dadosGerais=[];
    vm.dadosGeraisDebito=[];
    vm.mostrarDadosGerais=true;

    vm.listarDadosGerais = function () {
      if(vm.rodadaSelecionada == null || vm.rodadaSelecionada == undefined){
        rodadaAPI.listarDadosGeraisValor().then(function(response) {
          vm.dadosGerais = response.data;

          rodadaAPI.listarDadosGeraisDebito().then(function(response) {
            vm.dadosGeraisDebito = response.data;

            if(vm.dadosGeraisDebito.length == 0){
              vm.dadosGerais.forEach(function(dbv) {
                  dbv['pagamento'] = true;
              });
            }
            vm.dadosGeraisDebito.forEach(function(dgd) {
              vm.dadosGerais.forEach(function(dbv) {
                if(dgd.nome_jogador == dbv.nome_jogador){
                  dbv['total_debito'] = dgd.total_debito;
                  dbv['total_devido'] = dgd.total;
                }else{
                  dbv['total_devido'] = 0;
                }
                if(dbv['total_debito'] == null || dbv['total_debito'] == undefined){
                  dbv['pagamento'] = true;
                }else{
                  dbv['pagamento'] = false;
                }
              });
            });

          });


          vm.mostrarDadosGerais=true;

        },function() {

        });
      }else{
        vm.mostrarDadosGerais=false;
      }

    };


    function gerarNumeroRodadas(){
      for (var i = 1; i < 39; i++) {
        vm.numeroRodadas.push(i);
      }
    };

    function filtrarRodadas() {
      rodadaAPI.filtrarRodadas().then(function(response) {
        vm.listaRodadas = response.data;
        vm.listaRodadas.forEach(function(lr) {
          vm.numeroRodadas.forEach(function(nr,index){
            if(nr == lr.numero){
              vm.numeroRodadas.splice(index,1);
            }
          });
        });

      },function() {

      });
    };

    vm.atualizarTabelaRodada = function(numero) {
      if(numero != undefined || numero != null){
        rodadaAPI.listarJogadorRodada(numero.numero).then(function(response) {
          vm.rodadas = response.data;
        },function(response) {

        })
      }
    };

    vm.atualizarPagamentos = function(id){
      var confirmacao = window.confirm("Tem certeza que deseja confirmar o pagamento?");

      if(confirmacao){
        rodadaAPI.atualizarPagamentos(id).success(function(){
          vm.atualizarTabelaRodada(vm.rodadaSelecionada);
          vm.listarDadosGerais();
        }).error(function(){
          vm.listarDadosGerais();
        });
      }
    };

    vm.alterarStatusPagamento = function(rodada){
      rodada["pagamento"] = true;
      var confirmacao = window.confirm("Tem certeza que deseja confirmar o pagamento?");

      if(confirmacao){
        rodadaAPI.alterarStatusPagamento(rodada).success(function(){
          vm.atualizarTabelaRodada(vm.rodadaSelecionada);
        }).error(function(){

        });
      }else{
        rodada["pagamento"] = false;
      };

    };

    vm.abrirModal = function (size) {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/rodada/modalRodada.html',
        controller: 'modalCtrl',
        controllerAs:'vm',
        size: size,
        resolve:{
          itens:function(){
            return vm.numeroRodadas;
          }
        }
      });
    };

    vm.excluirRodada = function(numero){
      rodadaAPI.isExists(numero.numero).then(function(response) {

        rodadaAPI.excluirRodada(response.data.data[0].id).then(function(response) {
          location.reload();

        },function() {
          alert("Não foi possivel remover a rodada")
        })
      },function() {
        alert("Não foi possivel remover a rodada")
      })
    };

    vm.listarDadosGerais();
    gerarNumeroRodadas();
    filtrarRodadas();


  };
})();
