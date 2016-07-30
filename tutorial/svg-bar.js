var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
d3.select('#svgCon1').append('h2').text('The Old Chart');
d3.select("#svgCon1").selectAll("div")
    .data(dataset)
    .enter()
    .append("div")
    .attr("class", "bar")
    .style("height", function(d) {
        var barHeight = d * 5;
        return barHeight + "px";
    }).
    style("margin-right", "2px");
    
// new bar chart

//Width and height
var w = 500;
var h = 100;
//Create SVG element
d3.select('#svgCon2').append('h2').text('The new Chart');
var svg = d3.select("#svgCon2")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", 0)
   .attr("y", 0)
   .attr("width", 20)
   .attr("height", 100)
   .attr("x", function(d, i) {
        return i * 21;  //Bar width of 20 plus 1 for padding
    });
    

var svg = d3.select("#svgCon3")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", 0)
   .attr("y", 0)
   .attr("width", 20)
   .attr("height", 100)
   .attr("x", function(d, i) {
        return i * (w / dataset.length);
    });
    
    
var dataset = [ 5, 10, 13, 19, 21 ];
var svg = d3.select("#svgCon4")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", 0)
   .attr("y", 0)
   .attr("width", 20)
   .attr("height", 100)
   .attr("x", function(d, i) {
        return i * (w / dataset.length);
    });
        
//flexible
var dataset = [ 5, 10, 13, 19, 21 ];
var svg = d3.select("#svgCon5")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", 0)
   .attr("y", 0)
   .attr("width", 20)
   .attr("height", 100)
   .attr("x", function(d, i) {
        return i * (w / dataset.length);
    }).attr("width", w / dataset.length - 1);      
    
//set height
var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
var svg = d3.select("#svgCon6")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", 0)
   .attr("y", 0)
   .attr("width", 20)
   .attr("height", 100)
   .attr("x", function(d, i) {
        return i * (w / dataset.length);
    })
    .attr("width", w / dataset.length - 1)
    .attr("height", function(d) {
        return d * 4;
    });
        
//revert height
var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
var svg = d3.select("#svgCon7")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", 0)
   .attr("y", 0)
   .attr("width", 20)
   .attr("height", 100)
   .attr("x", function(d, i) {
        return i * (w / dataset.length);
    })
    .attr("y", function(d) {
        return h - (d * 4);
    })
    .attr("width", w / dataset.length - 1)
    .attr("height", function(d) {
        return d * 4;
    })
    .attr("fill", "teal");
            
//colorfully
var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
var svg = d3.select("#svgCon8")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", 0)
   .attr("y", 0)
   .attr("width", 20)
   .attr("height", 100)
   .attr("x", function(d, i) {
        return i * (w / dataset.length);
    })
    .attr("y", function(d) {
        return h - (d * 4);
    })
    .attr("width", w / dataset.length - 1)
    .attr("height", function(d) {
        return d * 4;
    })
    .attr("fill", function(d) {
    return "rgb(0, 0, " + (d * 10) + ")";
});

svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
        return d;
   })
   .attr("x", function(d, i) {
        return i * (w / dataset.length) + (w / dataset.length - 1) / 2;
    })
   .attr("y", function(d) {
        return h - (d * 4) + 14;  //15 is now 14
    })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white")
   .attr("text-anchor", "middle");