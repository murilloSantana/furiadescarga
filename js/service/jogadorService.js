(function() {

  app.factory("jogadorAPI",jogadorAPI);
  jogadorAPI.$inject = ["$http","Backand"];

  function jogadorAPI($http,Backand){

    var _listar = function(){
      return $http({
        method : 'GET',
        url : Backand.getApiUrl() + '/1/objects/jogador'
      })
    };
    var _salvarJogador = function(jogador){
      return $http({
        method : 'POST',
        url : Backand.getApiUrl() + '/1/objects/jogador',
        data:jogador
      })
    };
    var _editarJogador = function(jogador){
      return $http({
        method : 'PUT',
        url : Backand.getApiUrl() + '/1/objects/jogador/'+jogador.id,
        data:jogador
      })
    };
    var _excluirJogador = function(id){
      return $http({
        method : 'DELETE',
        url : Backand.getApiUrl() + '/1/objects/jogador/'+id
      });
    }
    return {
      salvarJogador: _salvarJogador,
      listar: _listar,
      editarJogador: _editarJogador,
      excluirJogador: _excluirJogador
    }
  };


})();
