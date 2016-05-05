(function() {
  app.controller("rodadaCtrl",rodadaCtrl);
  rodadaCtrl.$inject = ["$scope","userAPI","$uibModal"];

  function rodadaCtrl($scope,userAPI,$uibModal) {
    var vm = this;
    vm.numeroRodadas=[]
    function gerarNumeroRodadas(){
      for (var i = 1; i < 39; i++) {
        vm.numeroRodadas.push(i);
      }
    };
    gerarNumeroRodadas();




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
  };
})();
