function renderHistogram(id, data) {
    var formatCount = d3.format(',.0f');
    var margin = {top: 10, right: 20, bottom: 30, left: 35},
        width = 360 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;

    //var x = d3.scaleLinear() //default domain [0, 1]
    //    .rangeRound([0, width]); //continuous.range(range).interpolate(d3.interpolateRound);

	var x = d3.scaleLinear()
			.domain([0, d3.max(data.labels, function (d) {return d;})]) //0在这里会影响x轴的始点
			.range([0, width]);//.interpolate(d3.interpolateRound);
    
    //var bins = d3.histogram()
    //    .domain(x.domain())
    //    .thresholds(x.ticks(20))//两两组成阀值[0, 0.05, 0.1, 0.15000000000000002, 0.2, 0.25, 0.30000000000000004, 0.35000000000000003, 0.4, 0.45, 0.5, 0.55, 0.6000000000000001, 0.65, 0.7000000000000001, 0.75, 0.8, 0.8500000000000001, 0.9, 0.9500000000000001, 1]
    //    (data);
    
	//使用当前的数据构造histogram生成的数据(应该知道histogram的原理)
	//二维数组，每个数组元素的x0和x1代表的是范围，每个数组元素的length代表其内bin的个数（Thus, the length of the bin is the number of elements in that bin）
	var bins = [], values = data.values || [], labels = data.labels || [], length = labels.length, i = 1, item;
	for (; i < length; i++) {
		item = new Array(values[i - 1]);
		item.x0 = labels[i - 1];
		item.x1 = labels[i];
		bins.push(item);
	}
	console.dir(bins); //调用histogram的最终效果是生成范围内的数量 [[a, b, c].length/x0/x1]

    var y = d3.scaleLinear()
        .domain([0, d3.max(bins, function(d) { return d.length; })])
        .range([height, 0]);
        
    var maxValue = d3.max(bins, function(d) { return d.length; }) || 500, step = maxValue / 8,
        ysteps = d3.range(0, maxValue + step, step);
    var barWidth = x(bins[0].x1) - x(bins[0].x0), maxHeight = d3.max(bins, function(d){return height - y(d.length);});
        
    var svg = d3.select(id)
        .classed('commonchart-histogram', true)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    //根据bar的生成规则来生成格子
    svg.selectAll('.vertical-line')
        .data(bins)
        .enter().append('line')
        .attr('x1', function(d) {return x(d.x0) + barWidth;})
        .attr('y1', function(d) {return 0})
        .attr('x2', function(d) {return x(d.x0) + barWidth;})
        .attr('y2', maxHeight)
        .attr('class', 'vertical-line');
        
    svg.selectAll('.horizontal-line')
        .data(ysteps.filter(function(value){return value > 0;}))
        .enter().append('line')
        .attr('x1', 0)
        .attr('y1', function(d) {return y(d);})
        .attr('x2', width)
        .attr('y2', function(d) {return y(d);})
        .attr('class', 'horizontal-line');
    
    var bar = svg.selectAll('.bar')
        .data(bins)
        .enter().append('g')
        .attr('class', 'bar')
        .attr('transform', function(d) { return 'translate(' + x(d.x0) + ',' + y(d.length) + ')'; });

    bar.append('rect')
        .attr('x', 1)
        .attr('width', barWidth - 1)
        .attr('height', function(d) {return height - y(d.length);})
		.attr('title', function (d) {return d.length})
		.on('mouseenter', function (data, i, group) { //d3.event //The current event, if any.
            //point = d3.mouse(document.getElementById('histogram_bar_con'));//获取相对某容器的坐标
			var tooltip = d3.select(id + ' .d3-tooltip');
			if (!tooltip.size()) {
				tooltip = d3.select(id).append('div').attr('class', 'd3-tooltip');
			}
			tooltip.attr('style', 'left:' + d3.event.pageX + 'px; top:' + d3.event.pageY + 'px; display: block;')
				.html('值: ' + data.length + '<br> 范围：' + data.x0 + '-' + data.x1);
		})
		.on('mouseleave', function (data, i, group) {
			var tooltip = d3.select('body').select('.d3-tooltip');
			tooltip.attr('style', 'display: none;');
		});

    bar.append('text')
        .attr('dy', '.75em')
        .attr('y', 6)
        .attr('x', (x(bins[0].x1) - x(bins[0].x0)) / 2)
        .attr('text-anchor', 'middle')
        .text(function(d) { return formatCount(d.length); });

    svg.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x).tickValues(data.labels)); //利用axis函数来设置ticks，如axis.tickValues([values]),使用固定范围的ticks
	//.tickFormat(d3.format(',.2f')) 设置tick的格式

	svg.append('g')
        .attr('class', 'axis axis--y')
        .attr('transform', 'translate(0, 0)')
        .call(d3.axisLeft(y).tickValues(ysteps)); //利用axis函数来设置ticks，如axis.tickValues([values]),使用固定范围的ticks
}

//执行
var data0 = {
    'labels' : [0.0, 0.6, 1.2, 1.7999999999999998, 2.4, 3.0, 3.5999999999999996, 4.2, 4.8, 5.3999999999999995, 6],
    'values' : [519, 110, 0, 68, 0, 5, 4, 0, 5, 1],
    'type' : 'histogram'
};
var data = {
    'labels' : [0.0, 0.6666666666666666, 1.3333333333333333, 2.0, 2.6666666666666665, 3.333333333333333, 4.0, 4.666666666666666, 5.333333333333333, 6],
    'type' : 'histogram',
    'values' : [519, 110, 0, 68, 5, 0, 4, 5, 1]
};
renderHistogram('.chart-container', data);