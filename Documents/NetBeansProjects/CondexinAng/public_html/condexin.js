angular.module('condexinApp',['ngRoute','ui.bootstrap'])
.controller('MainController',['$scope','$location','$rootScope',function($scope,$location,$rootScope){
    $scope.goHome=function(){
        $location.path('/');
    };
    $scope.goBooks=function(){
        $location.path('/books');
    };
    $scope.bookDisp=function(data){
       for(i=1;i<=8;i++){
           v="Book"+i;
         if($rootScope.myData.Books[v]===data){
             $location.path('/books/'+v);
          } 
       }  
    };
}])
.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl:'main.html',
        controller:'MainController',
        css:'condexin.css'
    })        
    .when('/books/:name',{
        templateUrl:'bookContent.html',
        controller:'BookController',
        css:'condexin.css'
    })
    .otherwise({
        reDirectTo:'/'
    });
   // angular.bootstrap(document,['condexinApp']);
})
.controller('BookController',['$scope','$location','$rootScope',function($scope,$location,$rootScope){
    $scope.books=[];    
    $scope.bookName=$location.path();
    $scope.bookName=$scope.bookName.substr(7);
    var myData=$rootScope.myData;
    $scope.edit=true;
    $scope.imgURL=myData.Books[$scope.bookName]['Image URL'];
    $scope.title=myData.Books[$scope.bookName].Title;
    $scope.subtitle=myData.Books[$scope.bookName].Subtitle;
    $scope.author=myData.Books[$scope.bookName].Author;
    $scope.publisher=myData.Books[$scope.bookName].Publisher;
    $scope.price=myData.Books[$scope.bookName].Price;
    $scope.description=myData.Books[$scope.bookName].Description;
    $scope.dispDetailDesc=function(){
        $scope.edit=!$scope.edit;
    };    
    for(i=1;i<=8;i++){
        v="Book"+i;
        if(v!==$scope.bookName){
            $scope.books.push(myData.Books[v]);
        }
    }
    $scope.changeBook=function(book){
        for(i=1;i<=8;i++){
           v="Book"+i;
         if($rootScope.myData.Books[v]===book){
             $location.path('/books/'+v);
          } 
       }  
    };
}])
.run(['$rootScope','$http',function($rootScope,$http){
    $http.get("condexin.json").then(function(response){
        $rootScope.myData=response.data;
       
    });
}]);

   

    

