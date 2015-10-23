angular.module('myApp',['ngRoute','ngCookies','LocalStorageModule'])
    .controller('myCtrl',['$scope','$cookies','$location','localStorageService',function($scope,$cookies,$location,localStorageService){
            $scope.userName=localStorageService.get('UserName');
                $scope.userLogin=function(uname,password){
                    $cookies.put('UserName',uname);
                    $cookies.put('Password',password);
                    localStorageService.set('UserName',uname);
                    $location.path('/next');                    
                };
                $scope.checkCookies=function(){
                    alert($cookies.get('UserName'));
                    alert(localStorageService.get('UserName'));
                };
}])

    .config(['localStorageServiceProvider',function(localStorageServiceProvider){
        localStorageServiceProvider
            .setPrefix('myApp')
            .setStorageType('sessionStorage')
            .setNotify(true,true);
            
}])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider
        .when('/',{
            controller:'myCtrl',
            templateUrl:'Loginpage.html'
        })
        .when('/next',{
            controller:'myCtrl',
            templateUrl:'NextPage.html'
        })
        .otherwise({reDirectTo:'/'});
}]);

