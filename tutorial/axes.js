var w = 500;
var h = 300;
var padding = 30;

var dataset = [
	[5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
	[410, 12], [475, 44], [25, 67], [85, 21], [220, 88],
	[600, 150]
];

d3.select('#svgCon1').append('h1').text('axes demo');
d3.select('#svgCon1').append('h2').text('scatterplot with size and label demo');

//Create scale functions
var xScale = d3.scaleLinear()
	.domain([0, d3.max(dataset, function (d) {
				return d[0];
			})])
	.range([padding, w - padding * 2]);

var yScale = d3.scaleLinear()
	.domain([0, d3.max(dataset, function (d) {
				return d[1];
			})])
	.range([h - padding, padding]);

var rScale = d3.scaleLinear()
	.domain([0, d3.max(dataset, function (d) {
				return d[1];
			})])
	.range([2, 5]);

//Create SVG element
var svg = d3.select("#svgCon1")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

svg.selectAll("circle")
.data(dataset)
.enter()
.append("circle")
.attr("cx", function (d) {
	return xScale(d[0]);
})
.attr("cy", function (d) {
	return yScale(d[1]);
})
.attr("r", function (d) {
	return rScale(d[1]);
});

svg.selectAll("text")
.data(dataset)
.enter()
.append("text")
.text(function (d) {
	return d[0] + "," + d[1];
})
.attr("x", function (d) {
	return xScale(d[0]);
})
.attr("y", function (d) {
	return yScale(d[1]);
})
.attr("font-family", "sans-serif")
.attr("font-size", "11px")
.attr("fill", "red");

svg.append("g")
	.attr("transform", "translate(0," + (h - padding) + ")")
	.call(d3.axisBottom(xScale).ticks(5));
svg.append("g")
	.attr("transform", "translate(" + padding + ",0)")
	.call(d3.axisLeft(yScale).ticks(5));