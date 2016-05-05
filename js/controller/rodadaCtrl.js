app.controller("rodadaCtrl",function($scope,userAPI,$uibModal) {

  $scope.numeroRodadas=[]
  $scope.gerarNumeroRodadas = function(){
    for (var i = 1; i < 39; i++) {
        $scope.numeroRodadas.push(i);
    }
  };
  $scope.gerarNumeroRodadas();




  $scope.abrirModal = function (size) {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/rodada/modalRodada.html',
        controller: 'modalCtrl',
        size: size,
        resolve:{
          itens:function(){
            return $scope.numeroRodadas;
          }
        }


      });
    }
});
