angular.module("myApp",[])
        .controller("myCtrl",['$scope',function($scope){
                $scope.filename="service_json.json";
                $scope.filename1="myData.json";
               
        }])
    .directive("treechart",function($rootScope){
            return{
                restrict:'E',
                link:function(scope,element){
                    var h=560,w=600,padding=30,cells;
                    var margin={left:30,right:30,top:30,bottom:30};
                    var color=d3.scale.category10();
                   // scope.$watch({scope.filename},function(){updateGraph();});
                    var canvas=d3.select("body").append("svg")
                            .attr("height",h+margin.top+margin.bottom)
                            .attr("width",h+margin.left+margin.right)
                            .append("g")
                            .attr("transform","translate(20,20)");
                        var treemap=d3.layout.treemap()
                                .size([w,h]) 
                                
                                .value(function(d){return d.depth;})
                              //  .sticky(false)
                               .round(true);
                        switchData();
                        function switchData(){
                            canvas.select(".children cells").remove();
                           
                        d3.json(scope.filename,function(data){ 
                                    /*  var node=treemap.nodes(data);
                            var parents=node.filter(function(d){
                               return d.children; 
                            });
                            var children=node.filter(function(d){
                               return !d.children; 
                            });
                            console.log(parents);*/
                             
                            var cells=canvas.selectAll(".cells")
                                    .data(treemap(data))
                                    .enter()
                                    .append("g")
                                    .attr("class","cells");
                            cells.append("rect")
                                    .call(position)
                                    .transition()
                                    .attr("fill",function(d){return d.children? null:color(d.parent.name);})
                                    .attr("stroke","white");                      
                            cells.append("text")
                                    .transition()
                                    .duration(1000)
                                    .attr("x",function(d){return d.x+d.dx/2;})
                                    .attr("y",function(d){return d.y+d.dy/2;})
                                    .attr("text-anchor","middle")
                                    .attr("word-wrap","break-word")
                                    .style("font-size","10px")
                                    .text(function(d){return d.children? null:d.name;})
                                    .transition();
                            cells.on("click",function(d){updateChart(d);});
                        });
                    }
                       function updateChart(d){
                         canvas.selectAll(".cells").remove();
                         // d3.json(scope.filename1,function(data){
                            //  console.log(json);
                          var data=d.parent;
                            console.log(data);
                          var second=canvas.selectAll(".cells")
                                   .data(treemap(data))
                                   .enter()
                                   .append("g")
                                   .attr("class","ccells");                           
                           second.append("rect")
                                   .call(position)
                                   .transition()
                                 //  .duration(800)
                                   .attr("fill",function(d){return d.children? null:color(d.parent.name);})
                                   .attr("stroke","white");                          
                            second.append("text")
                                    .transition()
                                    .duration(1000)
                                    .attr("x",function(d){return d.x+d.dx/2;})
                                    .attr("y",function(d){return d.y+d.dy/2;})
                                    .attr("text-anchor","middle")
                                    .attr("word-wrap","break-word")
                                    .style("font-size","10px")
                                    .text(function(d){return d.children? null:d.name;})
                                    .transition();
                           second.on("click",function(){switchData();});  
                       //  });  
                       }
                        function position(){
                            this.attr("x",function(d){//console.log(d.x);
                                return d.x;})
                                .attr("y",function(d){//console.log(d.y);
                                return d.y;})
                                .attr("width",function(d){//console.log(d.dx);
                                return d.dx;})
                                .attr("height",function(d){//console.log(d.dy);
                                return d.dy;});
                        }
                    
                }                
            };
        });


