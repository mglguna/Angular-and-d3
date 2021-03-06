(function(){
    angular.module("demoApp",['ngRoute','ngCookies'])
    .controller("MainController",['$scope','$http','$cookies','$location',function($scope,$http,$cookies,$location){
        $scope.customer=[{'name':'Guna','age':'28'},{'name':'chari','age':'33'}];   
        $http.get("http://jsonplaceholder.typicode.com/posts?userId=1").then(function(response){
			$scope.result=response.data;
        });
        $scope.$watch("countSelection",function(n,o){
            if(n!=o){
                $scope.datetime=Date().toString();
            }
        },true);
        $http.get("booksJson.json").then(function(response){
            $scope.mydata=response.data;
        });   
        $scope.change=function(){
           console.log($scope.name); 
           $location.path("/"+$scope.name);           
        };
        $cookies.userName='Guna';
        $scope.getUserName=$cookies.userName;
        $cookies.put('fruit','Orange');
        $cookies.put('Vegetable','Carrot');
        $scope.getName=$cookies.get('fruit');
    }])
    .config(function($routeProvider){
         $routeProvider
         .when('/Books',{
             templateUrl:'bookDisp.html',
             controller:'MainController'             
         })
         .when('/Conferences',{
             templateUrl:'ConfDisp.html',
             controller:'MainController'             
         })
         .when('/Courses',{
             templateUrl:'CourseConf.html',
             controller:'MainController'             
         })
        .otherwise({
            reDirectTo:'/'
         });
         
    })
    .directive('myDirect',function(){
        return{
            restrict:'E',
            controller:'MainController',
            //template:"<b>This is an Element</b>",
            templateUrl:'confDisp.html',
            /*scope:{
                cutomer:'=info'
            },*/
            link:function(scope,element,attrs){
               // element[0].innerHTML="<b>This is an Element</b>";
                element.bind('mouseenter',function(){
                    element[0].innerHTML="<b>mouse</b>";
                });
                element.bind('mouseleave',function(){
                    element[0].innerHTML="<b>This is an Element</b>";
                });
            }
        };
    });
}());

