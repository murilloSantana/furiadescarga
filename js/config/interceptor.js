(function() {

  app.factory("httpInterceptor",httpInterceptor);

  httpInterceptor.$inject=["$q","$location","$injector","Backand"];

function httpInterceptor($q,$location,$injector,Backand) {

  return{
      requestError: function(rejection){
        return $q.reject(rejection);
      },
      response: function(response){
         Backand.getUserDetails().then(function(response){
            if(response == null && response == undefined){
              $location.path("/login");
            }
          },function(){
            $location.path("/login");
          })
          return response;
      },
      responseError: function(rejection){
        if((rejection.config.url + "").indexOf('token') === -1){
          if(rejection.status === 401 && !Backand.isManagingRefreshToken()){
            $location.path("/login");
          }
        }
        return $q.reject(rejection);
      }
  }
}
})()
