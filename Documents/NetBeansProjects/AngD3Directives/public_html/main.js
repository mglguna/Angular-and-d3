angular.module("myApp",[])
      .directive("piechart",function($window){
        return{
          restrict:"E",
          template:"<h1>PieChart</h1>",
          link:function(scope,element,attr){ 
            var win=angular.element($window);
            scope.setHeightWidth=function(){
                return{
                     'h':win.innerHeight(),
                     'w':win.innerWidth()
                };          
            }; 
            win.on('resize',scope.setHeightWidth());
            scope.$watch("setHeightWidth()",function(newvalue){               
                var h=newvalue.h;
                var w=newvalue.w;
                createGraph(h,w);
            },true);
            scope.getData=function(){
                d3.json('http://jsonplaceholder.typicode.com/posts?userId=1',function(data){
                       data.forEach(function(d){
                            scope.data=d.data;
                        });
                });
            };
            var createGraph=function(h,w){
                console.log("In createGraph");
                d3.select('svg').remove();
                var color=d3.scale.category10();
                var canvas=d3.select(element[0]).append("svg")
                        .attr("height",h)
                        .attr("width",w)
                        .append("g")
                        .attr("transform","translate(200,200)");
                     var data=getData(); 
                  // console.log(data);
                    var arc=d3.svg.arc()
                            .innerRadius(0)
                            .outerRadius(w/5);
                    var pie=d3.layout.pie()
                            .value(function(d){return d.body.length;});
                    var arcs=canvas.selectAll(".arcs")
                            .data(pie(data))
                            .enter()
                            .append("g")
                            .attr("class","arcs")
                            .on("click",function(d){
                                arcs.append("text")
                                    .transition()
                                    .attr("x",-100)
                                    .attr("y",200)                                
                                    .attr("background","yellow")
                                    .text(d.data.body)
                                    .attr("id","text")
                                    .duration(5000)
                                    .delay(1000)
                                    .each("end",function(){d3.select(this).transition().attr("x",-500).duration(1000).remove();}); 
                            //text.transition().attr("x",-500).remove();
                                    });
                    arcs.append("path")
                            .attr("d",arc)
                            .attr("class","arc1")
                            .attr("fill",function(d){return color(d.data.body);});                           
                    arcs.append("text")
                            .attr("transform",function(d){return "translate("+arc.centroid(d)+")";})
                            .attr("text-anchor","middle")
                            .attr("dy",".35em")
                            .text(function(d){return d.data.id;})
                            .attr("class","arcText");
                      

             };
            }
        };
});


