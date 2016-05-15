(function() {

  app.factory("httpInterceptor",httpInterceptor);

  httpInterceptor.$inject=["$q","$location","$injector","Backand","$rootScope"];

  function httpInterceptor($q,$location,$injector,Backand,$rootScope) {

    return{
      request: function(config) {
        $rootScope.loading = true;
        var url = config.url;
        if (url.indexOf('template') > -1) return config;
        var timestamp = new Date().getTime();
        config.url = url + "?timestamp=" + timestamp;

        return config;
      },
      requestError: function(rejection){
        $rootScope.loading = false;

        return $q.reject(rejection);
      },
      response: function(response){
        $rootScope.loading = false;

        Backand.getUserDetails().then(function(response){

          if(response == null && response == undefined && $location.url() != "/cadastro"){
            $location.path("/login");
          }
        },function(){
          $location.path("/login");
        })
        return response;
      },
      responseError: function(rejection){
        $rootScope.loading = false;

        if(rejection.status === 401 && !Backand.isManagingRefreshToken() || rejection.status === 404){
          $location.path("/login");
        }

        return $q.reject(rejection);
      }
    }
  }
})()
