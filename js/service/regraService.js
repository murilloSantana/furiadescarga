(function() {

  app.factory("regraAPI",regraAPI);
  regraAPI.$inject = ["$http","Backand"];

  function regraAPI($http,Backand){


    var _listarRegra = function(){
    return $http({
      method : 'GET',
      url : Backand.getApiUrl() + '/1/objects/regras',
      params:{
        sort:[{fieldName:"posicao",order:"asc"}]
      }

    });
  };
  var _salvarRegra = function(regra){
    return $http({
      method : 'POST',
      url : Backand.getApiUrl() + '/1/objects/regras',
      data:regra
    });
  };
  var _editarRegra = function(regra){
    return $http({
      method : 'PUT',
      url : Backand.getApiUrl() + '/1/objects/regras/'+regra.id,
      data:regra
    });
  };
  var _excluirRegra = function(id){
    return $http({
      method : 'DELETE',
      url : Backand.getApiUrl() + '/1/objects/regras/'+id
    });
  };

  return{
    listarRegra:_listarRegra,
    salvarRegra:_salvarRegra,
    editarRegra:_editarRegra,
    excluirRegra:_excluirRegra,
  }
};

})();
