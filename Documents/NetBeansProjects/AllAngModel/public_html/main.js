angular.module("myApp",['ngRoute'])
        .controller("myCtrl",['$scope','$injector','myProvider','myFactory',function($scope,$injector,myProvider,myFactory){
                var s=$injector.get('myService');
                $scope.name=s.name;
                $scope.myColor=myProvider.color;
                $scope.edit=myFactory.setName();
        }])
        .service("myService",function(){
                this.name="Service";
        })
        .provider("myProvider",function(){
            var hex;
            return{
                setColor:function(color){
                    hex=color;
                },
                $get:function(){
                    return{
                       color:hex
                    };
                }                 
            };            
        })
        .factory("myFactory",function($location){                    
            return{
              setName:function(){
                  return $location.path();
              } 
            };
        })
        .config(function(myProviderProvider){
            myProviderProvider.setColor("red");
        })
        .config(function($routeProvider){
            $routeProvider
            .when("/",{
                    controller:"myCtrl",	
                    templateUrl:"view1.html"
            })
            .when("/view2",{
                    controller:"myCtrl",
                    templateUrl:"view2.html"					
            })
            .otherwise({redirectTo:"/"});
        })
            .directive("treechart",function(){
                return{
                    restrict:'E',
                    link:function(scope,element,attr){
                        var h=500,w=500,padding=30;
                        var canvas=d3.select("body").append("svg")
                                .attr("height",h+padding*2)
                                .attr("width",w+padding*2)
                                .append("g")
                                .attr("transform","translate(10,10)");
                        var tree=d3.layout.tree()
                                .size([h,w]);
                        d3.json("condexin.json",function(data){
                            var nodes=tree.nodes(data);
                            var link=tree.links(nodes);                            
                            var diagonal=d3.svg.diagonal()
                                    .projection(function(d){return [d.y,d.x];});
                            var node=canvas.selectAll(".node")
                                    .data(nodes)
                                    .enter()
                                    .append("g")
                                    .attr("transform",function(d){return "translate("+d.y+","+d.x+")";});
                            node.append("circle")
                                    .attr("r","3")
                                    .attr("stroke","red")
                                    .attr("fill","none");
                            node.append("text")
                                    .text(function(d){return d.name;});
                            canvas.selectAll(".link")
                                    .data(link)
                                    .enter()
                                    .append("path")
                                    .attr("fill","none")
                                    .attr("stroke","red")
                                    .attr("d",diagonal);
                    });
                }
           };    
        });

