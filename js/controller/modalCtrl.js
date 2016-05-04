app.controller('modalCtrl', function ($scope, $uibModalInstance,itens,jogadorAPI,rodadaAPI,regraAPI) {

  $scope.numeroRodadas = itens;
  $scope.listaJogadores={};
  $scope.listaDadosRodada=[];

  $scope.listarRegra = function(){
    regraAPI.listarRegra().success(function(response){
      $scope.regras = response.data;
    }).error(function(response){

    });
  };
  $scope.listarRegra();


  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.carregarJogadores = function(){
    jogadorAPI.listarTodosJogadores().success(function(response){
      $scope.listaJogadores = response.data;
        $scope.listaJogadores["regras"] = $scope.regras;
        console.log($scope.listaJogadores.regras)
    }).error(function(response){

    });
  };
  $scope.carregarJogadores();

  $scope.atualizarLista = function(rodada){
    $scope.listaDadosRodada.push(rodada);
    $scope.rodada={};
  };

  $scope.salvarRodada = function(numeroRodada){
    var rodada = {"numero":numeroRodada};

    rodadaAPI.salvarRodada(rodada).success(function(response){
      var respostaRodada = response;

      $scope.listaDadosRodada.forEach(function(ldr){

        var taxa;

        rodadaAPI.atribuirDebito(ldr.posicao).success(function(response){
          if(response.data == undefined || response.data == null || response.data.length == 0){
            alert("Umas das posições não está definida em regras!");
          }else{
            taxa = response.data[0].taxa;
          }

          console.log(taxa)
          var jogadorRodada={"statusPagamento":false,"debito":taxa,"posicao":ldr.posicao};


          rodadaAPI.salvarJogadorRodada(jogadorRodada).success(function(response){
            var respostaJogadorRodada = response;
            var jogRod = {"objectId":respostaJogadorRodada.objectId,"___class":"jogadorRodada"}
            rodada =
            {
              "numero": respostaRodada["numero"],
              "created": respostaRodada["created"],
              "objectId": respostaRodada["objectId"],
              "___class": "rodada",
              "id_jogador_rodada": []

            }

            rodada.id_jogador_rodada.push(jogRod);

            rodadaAPI.atualizarRodada(respostaRodada["objectId"],rodada).success(function(response) {
              console.log(response)

            }).error(function(response){
              console.log(response)

            })


            jogador =
            {
              "nomeJogador": ldr.jogador.nomeJogador,
              "nomeTime": ldr.jogador.nomeTime,
              "created": ldr.jogador.created,
              "objectId": ldr.jogador.objectId,
              "___class": "jogador",
              "id_jogador_rodada": []
            }
            jogador.id_jogador_rodada.push(jogRod);

            rodadaAPI.atualizarJogador(ldr.jogador.objectId,jogador).success(function(response){
              console.log(response)
            }).error(function(response){
              console.log(response)

            });

          }).error(function(){

          });
        }).error(function(response){
          alert("ERRO");
        });

      });

    }).error(function(){

    });


  };
});
