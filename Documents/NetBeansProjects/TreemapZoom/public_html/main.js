angular.module("myApp",[])
        .controller("myCtrl",function($scope){
               $scope.filename="service_json.json";
            
})
        .directive("treemap",function(){
            return{
                restrict:'E',
                link:function(scope,element,attr){
                      var h=500,w=500,padding=30,node,root;
                      var color=d3.scale.category10();
                      var margin={left:30,right:30,bottom:30,top:30};
                      var xScale=d3.scale.linear()
                              .range([0,w]);
                      var yScale=d3.scale.linear()
                              .range([0,h]);
                      var zoom=d3.behavior.zoom()
                              .scaleExtent([1,10])
                              .on('zoom',zoomed);
                      var canvas=d3.select("body").append("svg")
                              .attr("height",h)
                              .attr("width",w)
                              .append("g")
                              .attr("transform","translate(.5,.5)")
                              .call(zoom);
                      var container=canvas.append("g");
                      var treemap=d3.layout.treemap()
                              .size([w,h])
                              .value(function(d){return d.depth;})
                              .round(false)
                              .sticky(true);
                      d3.json(scope.filename,function(data){ 
                         // xScale.domain([d.x,d.x+d.dx]);
                           // yScale.domain([d.y,d.y+d.dy]); 
                           node=root=data;
                           var nodes=treemap.nodes(data)
                                   .filter(function(d){return !d.children;});
                        var cells=container.selectAll(".cells")
                                .data(nodes)
                                .enter()
                                .append("g")
                                .attr("class","cells")
                                .attr("transform",function(d){return "translate("+d.x+","+d.y+")";})                      
                                .on("click",function(d){return zoom1(node==d.parent?root:d.parent);});
                        var rect=cells.append("rect")
                                .attr("height",function(d){return d.dy;})
                                .attr("width",function(d){return d.dx;})
                                .transition()
                                .attr("fill",function(d){return d.children?null:color(d.parent.name);})
                                .attr("stroke","white");
                        cells.append("text")
                                .transition()
                                .duration(1000)
                                .attr("x",function(d){return d.dx/2;})
                                .attr("y",function(d){return d.dy/2;})
                                .attr("text-anchor","middle")
                                .attr("font-size","10px")
                                .text(function(d){return d.children?null:d.name;});
                        d3.select("window").on("click",function(){zoom1(root);});
                    });
                        function zoom1(d){
                            console.log("dsdfdsf");
                            var ky=h/d.dy;
                            var kx=w/d.dx;
                            xScale.domain([d.x,d.x+d.dx]);
                            yScale.domain([d.y,d.y+d.dy]);
                            var t = container.selectAll(".cells").transition()
                                  .duration(1000)
                                    .attr("transform", function(d) { return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"; });
                            t.select("rect")
                                .attr("width", function(d) { return kx * d.dx-1; })
                                .attr("height", function(d) { return ky * d.dy-1; });
                            t.select("text")
                                .attr("x", function(d) { return kx * d.dx / 2; })
                                .attr("y", function(d) { return ky * d.dy / 2; });
                              //  .style("opacity", function(d) { return kx * d.dx > d.w ? 1 : 0; });

                            node = d;
                            d3.event.stopPropagation();
                        }
                        function zoomed(){
                           container.attr("transform","translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                        }
                    }    
                };
        });



