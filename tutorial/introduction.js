// d3.select("body").append("div").text("New paragraph!");

//d3.selectAll("p").style("color", "blue");
//d3.select("body").style("background-color", "black");

/*
d3.selectAll("p").style("color", function() {
  return "hsl(" + Math.random() * 360 + ",100%,50%)";
});
d3.selectAll("p").style("color", function(d, i) {
  return i % 2 ? "#fff" : "#eee";
});
*/

/*
d3.selectAll("p")
.data([4, 8, 15, 16, 23, 42])
.style("font-size", function(d) { return d + "px"; });
*/

/*
d3.select("body")
  .selectAll("p")
  .data([4, 8, 15, 16, 23, 42])
  .enter().append("p")
  .text(function(d) { return "I¡¯m number " + d + "!"; });
*/

/* // Update¡­
var p = d3.select("body")
  .selectAll("p")
  .data([4, 8, 15, 16, 23, 42])
  .text(function(d) { return d; });

// Enter¡­
p.enter().append("p")
  .text(function(d) { return d; });

// Exit¡­
p.exit().remove();   */

//d3.select("body").transition()
//.style("background-color", "black");

// d3.selectAll("circle").transition()
// .duration(750)
// .delay(function(d, i) { return i * 10; })
// .attr("r", function(d) { return Math.sqrt(d * scale); });


// »­BAR CHAR
// var dataset = [ 5, 10, 15, 20, 25 ];
// var dataset = [ 25, 7, 5, 26, 11 ];
var dataset = [ 25, 7, 5, 26, 11, 8, 25, 14, 23, 19,
                14, 11, 22, 29, 11, 13, 12, 17, 18, 10,
                24, 18, 25, 9, 3 ];
d3.select("body").selectAll("div")
    .data(dataset)
    .enter()
    .append("div")
    .attr("class", "bar")
    .style("height", function(d) {
        return d * 5 + "px";
    })
    .style("margin-right", function(d) {
        return "2px";
    });
    
//create svg
var w = 500;
var h = 50;
var svg = d3.select("#svgCon")
            .append("svg")
            .attr("display", 'block')   // <-- Here
            .attr("width", w)   // <-- Here
            .attr("height", h); // <-- and here!
var dataset = [ 5, 10, 15, 20, 25 ];
var circles = svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle");

circles.attr("cx", function(d, i) {
        return (i * 50) + 25;
    })
   .attr("cy", h/2)
   .attr("r", function(d) {
        return d;
   })
    .attr("fill", "yellow")
    .attr("stroke", "orange")
    .attr("stroke-width", function(d) {
        return d/2;
    });