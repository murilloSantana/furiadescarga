
(function(){

  app.factory("rodadaAPI",rodadaAPI);
  rodadaAPI.$inject = ["$http","Backand"];

  function rodadaAPI($http,Backand) {

    var _listarJogadorRodada = function(numero){
      return $http ({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/query/data/listarJogadorRodada',
        params: {
          parameters: {
            numero: numero
          }
        }
      });
    };
    var _salvarRodada = function(rodada){
      return $http({
        method : 'POST',
        url : Backand.getApiUrl() + '/1/objects/rodada',
        data:rodada
      })
    };
    var _excluirRodada = function(id){
      return $http ({
        method: 'DELETE',
        url: Backand.getApiUrl() + '/1/objects/rodada/'+id
      });
    };
    var _salvarJogadorRodada = function(dados){
      return $http({
        method : 'POST',
        url : Backand.getApiUrl() + '/1/objects/jogador_rodada',
        data:dados
      })
    };
    var _filtrarRodadas = function(){
      return $http({
        method : 'GET',
        url : Backand.getApiUrl() + '/1/query/data/filtrarRodadas'
      })
    };
    var _isExists = function(numero) {
      return $http({
        method : 'GET',
        url : Backand.getApiUrl() + '/1/objects/rodada',
        params:{
          filter:[{fieldName:"numero",operator:"equals",value:numero}]

        }
      })
    };
    var _alterarStatusPagamento = function(rodada){
      return $http({
        method : 'PUT',
        url : Backand.getApiUrl() + '/1/objects/jogador_rodada/'+rodada.id,
        data : rodada
      })
    };
    var _listarDadosGeraisValor = function() {
      return  $http ({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/query/data/dadosGeraisValor',
        params: {
          parameters: {}
        }
      });
    };
    var _listarDadosGeraisDebito = function() {
      return $http ({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/query/data/dadosGeraisDebito',
        params: {
          parameters: {}
        }
      });
    };
    var _atualizarPagamentos = function(id) {
      return $http ({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/query/data/atualizarPagamentos',
        params: {
          parameters: {
            jogador: id
          }
        }
      });
    };
    return{
      listarJogadorRodada: _listarJogadorRodada,
      salvarRodada: _salvarRodada,
      salvarJogadorRodada:_salvarJogadorRodada,
      filtrarRodadas: _filtrarRodadas,
      isExists: _isExists,
      alterarStatusPagamento:_alterarStatusPagamento,
      listarDadosGeraisValor:_listarDadosGeraisValor,
      listarDadosGeraisDebito:_listarDadosGeraisDebito,
      atualizarPagamentos:_atualizarPagamentos,
      excluirRodada:_excluirRodada
    }
  };

})();
