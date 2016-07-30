var dataset = [
	[5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
	[410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
];
var w = 500;
var h = 100;
var padding = 20;

d3.select('#svgCon1').append('h1').text('scale demo');

d3.select('#svgCon1').append('h2').text('the old scatterplot demo');
var svg = d3.select('#svgCon1')
	.append('svg')
	.attr('width', w)
	.attr('height', h);
svg.selectAll('circle')
	.data(dataset)
	.enter()
	.append('circle')
	.attr('cx', function (d) {return d[0];})
	.attr('cy', function (d) {return d[1]})
	.attr("r", function(d) {
		return Math.sqrt(h - d[1]);
	});
svg.selectAll('text')
	.data(dataset)
	.enter()
	.append('text')
	.text(function (d) {
		return d[0] + ',' + d[1];
	})
	.attr('x', function (d) {return d[0];})
	.attr('y', function (d) {return d[1];})
	.attr("font-family", "sans-serif")
	.attr("font-size", "11px")
	.attr("fill", "red");

dataset = dataset.concat([[600, 150]]);
d3.select('#svgCon2').append('h2').text('the new scatterplot with scale demo');
var xScale = d3.scaleLinear()
	 .domain([0, d3.max(dataset, function(d) { return d[0]; })])
	 .range([padding, w - padding*2]);
var yScale = d3.scaleLinear()
	 .domain([0, d3.max(dataset, function(d) { return d[1]; })])
	 .range([h - padding, padding]);
var rScale = d3.scaleLinear()
	 .domain([0, d3.max(dataset, function(d) { return d[1]; })])
	 .range([2, 5]);
	 
var svg = d3.select('#svgCon2')
	.append('svg')
	.attr('width', w)
	.attr('height', h);
svg.selectAll('circle')
	.data(dataset)
	.enter()
	.append('circle')
	.attr('cx', function (d) {return xScale(d[0]);})
	.attr('cy', function (d) {return yScale(d[1]);})
	.attr("r", function(d) {
		return rScale(d[1]);
	});
svg.selectAll('text')
	.data(dataset)
	.enter()
	.append('text')
	.text(function (d) {
		return d[0] + ',' + d[1];
	})
	.attr('x', function (d) {return xScale(d[0]);})
	.attr('y', function (d) {return yScale(d[1]);})
	.attr("font-family", "sans-serif")
	.attr("font-size", "11px")
	.attr("fill", "red");