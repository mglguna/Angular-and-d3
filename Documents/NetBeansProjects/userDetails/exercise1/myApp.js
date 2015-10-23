(function(){
    angular.module("demoApp",[])
    .controller("MainController",['$scope','$http',function($scope,$http){
        $http.get("booksJson.json").then(function(response){
            $scope.mydata=response.data;
            console.log($scope.mydata);
        });
    
    }]);
}());
