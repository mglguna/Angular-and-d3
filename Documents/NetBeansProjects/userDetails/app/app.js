var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
          templateUrl: 'view1.html',
          controller: 'indexController1'
      })
      .when('/view/:id', {
          templateUrl: 'view2.html',
          controller: 'indexController1'
      })
      .otherwise({
          redirectTo: '/'
      });
});

app.controller('indexController1', function ($scope,simpleFactory) {
    $scope.customer=simpleFactory.getCustomer();
    $scope.insertName=function(){
        simpleFactory.putCustomer({'name':$scope.name,'city':$scope.city});
    };
});
app.factory("simpleFactory",function(){
    var factory={};
    var customer=[{'name':'Guna','city':'new york'},
        {'name':'Sri','city':'Fremont'},
        {'name':'Devi','city':'ariyalur'},
        {'name':'Shakthi','city':'kumbakonam'}];
    factory.getCustomer=function(){
        return customer;
    };
    factory.putCustomer=function(customer1){
        customer.push(customer1);
    };
return factory;
    
});

        /*app.controller('indexController2', function ($scope, $routeParams) {

});*/