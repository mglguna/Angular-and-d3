var app=angular.module("myApp",['ngRoute']);
    app.controller("MainController",['$scope','retrieveData','$http','$timeout','$location',function($scope,retrieveData,$http,$timeout,$location){
         $scope.filename="service_json.json"; 
         $http.get($scope.filename).then(function(response){
          // retrieveData.setData(response.data);
            $scope.data=response.data;
            retrieveData.setData($scope.data);
         }); 
         $scope.setClick=function(data){
            $timeout(function(){
                console.log(data.name);
            $location.path('/table/'+data.name);
            },100); 
         };
    }]);
    app.controller("TableController",['$scope','$routeParams','$compile','$timeout',function($scope,$routeParams,$compile,$timeout){
            $scope.data=$routeParams.data;
            var compile=$compile('<btnn></btnn>')($scope);
            angular.element(document.getElementById('holder')).append(compile);
            //$scope.compile=$compile(btnn)($scope);
          /*  $timeout(function(){
                $scope.data="EE Add";
            },1000);*/
            $scope.setData=function(){
              $scope.data="EE Add"; 
          };
    }]);
    app.directive("btnn",function(){
        return{
            restrict:'E',
            transclude:true,
            template:'<input type="submit" value="clickMe" ng-click="setData()">'
        };
    });
    app.directive("insertTable",function(retrieveData){
       return{
           restrict:'E',
           transclude:true,
           scope:{'value':'=val'},
           link:function(scope,element,attr){
               scope.datareceived="";
               var datas=retrieveData.getData();
               scope.tabledata={};
               scope.parentName="";
               scope.datareceived=scope.value;
               scope.$watch("value",function(n,o){
                  scope.datareceived=n;
                    for(i=0;i<datas.children.length;i++){
                        for(j=0;j<datas.children[i].children.length;j++){
                            if(scope.datareceived==datas.children[i].children[j].name){
                               scope.tabledata=datas.children[i].children[j];
                               scope.parentName=datas.children[i].name;
                               break;
                            }
                        }
                    }
                });
           },
           templateUrl:'tablebody.html'
       };
    });
    app.config(['$routeProvider',function($routeProvider){
       $routeProvider
               .when('/',{
                   templateUrl:'main.html',
                   controller:'MainController'
               })
               .when('/table/:data',{
                   templateUrl:'tableMain.html',
                   controller:'TableController'
               })
               .otherwise({
                   reDirectTo:'/'
               });
       }]);    
   app.service("retrieveData",function($rootScope){
       
        this.setData=function(data){
          this.treemapData=data;
        };
        this.getData=function(){
            return this.treemapData;
        };
   });
    app.directive("treemap",function(retrieveData,$timeout){
       return{
           restrict:'E',
           transclude:true,
           scope:{'val':'@','dial':'&'},
           link:function(scope,element,attr){
               var h=500,w=500,padding=30;
               var color=d3.scale.category10();
               var canvas=d3.select(element[0]).append("svg")
                       .attr("height",h+padding*2)
                       .attr("width",w+padding*2)
                       .append("g")
                       .attr("transform","translate(20,20)");
               var treemap=d3.layout.treemap()
                       .size([h,w])
                       .value(function(d){return d.depth;})
                       .round(false);
               $timeout(function(){
               var json=JSON.parse(scope.val);
             // var json=retrieveData.getData();
                var cells=canvas.selectAll(".cells")
                        .data(treemap(json))
                        .enter()
                        .append("g")
                        .attr("transform","translate(10,10)");
                cells.append("rect")
                        .attr("x",function(d){return d.x;})
                        .attr("y",function(d){return d.y;})
                        .attr("height",function(d){return d.dy;})
                        .attr("width",function(d){return d.dx;})
                        .attr("fill",function(d){return d.children?null:color(d.parent.name);})
                        .attr("stroke","white");
                cells.append("text")
                        .attr("x",function(d){return d.x+d.dx/2;})
                        .attr("y",function(d){return d.y+d.dy/2;})
                        .text(function(d){return d.children?null:d.name;})
                        .attr("text-anchor","middle")
                        .attr("word-wrap","break-words")
                        .attr("font-size","10px");  
                cells.on("click",function(d){
                   scope.dial({data1:d});
                });
              },100);
           }
       }; 
    });



