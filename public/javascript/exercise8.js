const WIDTH = 600;
const HEIGHT = 400;
const MARGIN = 40;
const SHIFT = 0.5;
const INNERWIDTH = WIDTH - (2*MARGIN);
const INNERHEIGHT = HEIGHT- (2*MARGIN);

var translate = function(x,y){
	return "translate(" + x + ", " + y + ")";
};

var transition = function(element, xMargin, yMargin){
	element.transition()
		.duration(1000)
		.attr('transform', translate(xMargin, yMargin));
};

var drawCircles = function(selection, data, xScale, yScale, sine){
	selection.selectAll("circle").data(data)
		.enter()
		.append("circle")
		.classed("circle", true)
		.attr("r", 2)
		.attr("cx", function(d){ return xScale(d[0])})
		.attr("cy", function(d){ if(sine){return yScale((sine(d[0])) + SHIFT*10); }return yScale(d[1])})
};

var appendPath = function(selection, data, line){
	selection.append("path")
		.attr("d", line(data))
		.classed("line", true);
};

var load = function(curve){
	var data = [[0,5], [1,9], [2,7], [3,5], [4,3], [6,4], [7,2], [8,3], [9,2]];
	
	var line = d3.line()
	        .curve(curve)
			.x(function(d){ return xScale(d[0])})
			.y(function(d){ return yScale(d[1])})

	var sine = d3.line()
	        .curve(curve)
			.x(function(d){ return xScale(d[0])})
			.y(function(d){ return yScale((Math.sin(d[0])) + SHIFT*10)})
		
	var xScale = d3.scaleLinear()
		.domain([0,10])
		.range([0,INNERWIDTH]);

	var yScale = d3.scaleLinear()
		.domain([0,10])
		.range([INNERHEIGHT, 0]);

	var xAxis = d3.axisBottom(xScale).ticks(10).tickFormat(function(d){ return d/10;})
	var yAxis = d3.axisLeft(yScale).ticks(10).tickFormat(function(d){ return d/10;})
	
	var svg = d3.select(".container").append("svg")
		.attr("height", HEIGHT)
		.attr("width", WIDTH)

	var normalLine = svg.append("g");
	var sinLine = svg.append("g");

	var xAxisGroup = svg.append("g")
		.call(xAxis)

	var yAxisGroup = svg.append("g")
		.call(yAxis);

	//  draw value line
	appendPath(normalLine, data, line);
	drawCircles(normalLine, data, xScale, yScale, NaN);
	
	//  draw sin value line
	appendPath(sinLine, data, sine);
	drawCircles(sinLine, data, xScale, yScale, Math.sin)

	//  transition for every element
	transition(normalLine, MARGIN, MARGIN);
	transition(sinLine, MARGIN, MARGIN);
	transition(xAxisGroup, MARGIN, INNERHEIGHT + MARGIN);
	transition(yAxisGroup, MARGIN, MARGIN);
};
