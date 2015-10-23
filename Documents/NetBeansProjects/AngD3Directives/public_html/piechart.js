
var color=d3.scale.category10();
var canvas=d3.select("body").append("svg")
        .attr("height",500)
        .attr("width",500)
        .append("g")
        .attr("transform","translate(200,200)");
d3.json('http://jsonplaceholder.typicode.com/posts?userId=1',function(data){
  
    var arc=d3.svg.arc()
            .innerRadius(0)
            .outerRadius(150);
    var pie=d3.layout.pie()
            .value(function(d){return d.body.length;});
    console.log(pie(data));
    var arcs=canvas.selectAll(".arcs")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class","arcs");
            
    arcs.append("path")
            .attr("d",arc)
            .attr("fill",function(d){return color(d.data.body);});
    arcs.append("text")
            .attr("transform",function(d){return "translate("+arc.centroid(d)+")";})
            .attr("text-anchor","middle")
            .attr("dy",".35em")
            .text(function(d){return d.data.id;});
    
            
    /*data.forEach(function(d){    
        data.body=d.body;
    });
   console.log(data.body.length); */
});



