angular.module("myApp",[])
        .controller("myCtrl",function($scope){
            $scope.filename="linechart.csv";
})
        .directive("linechart",function(){
            return{
                restrict:'E',
                link:function(scope,element,attr){
                    var h=500,w=500,padding=30;
                    var margin={left:30,right:30,bottom:30,top:30};
                    var canvas=d3.select("body").append("svg")
                            .attr("height",h+margin.top+margin.bottom)
                            .attr("width",h+margin.left+margin.top)
                            .append("g")
                            .attr("transform","translate(20,20)");
                    var parseDate=d3.time.format("%d-%b-%y").parse;
                    d3.csv(scope.filename,function(data){ 
                        data.forEach(function(d){
                            d.date=parseDate(d.date);
                            d.close=+d.close;
                        });
                    var xScale=d3.time.scale()
                            .domain(d3.extent(data,function(d){return d.date;}))
                            .range([0,w]);
                    var yScale=d3.scale.linear()
                            .domain([0,d3.max(data,function(d){return d.close;})])
                            .range([h,0]);
                    var xAxis=d3.svg.axis()
                            .scale(xScale)
                            .orient("bottom")
                            .ticks(5);
                    var yAxis=d3.svg.axis()
                            .scale(yScale)
                            .orient("left")
                            .ticks(5);
                    var line=d3.svg.line()
                            .x(function(d){return xScale(d.date);})
                            .y(function(d){return yScale(d.close);});
                    canvas.append("g")
                            .call(xAxis)
                            .attr("transform","translate(20,"+h+")");
                    canvas.append("g")
                            .call(yAxis)
                            .attr("transform","translate(20,0)");
                    canvas.append("path")
                            .attr("d",line(data))
                            .attr("class","line")
                            .attr("fill","none")
                            .attr("stroke","steelblue")
                            .attr("stroke-width","1.5px")
                            .attr("transform","translate(20,20)");
                            //.attr("fill","none");
                             
                });
            }
        };
});

