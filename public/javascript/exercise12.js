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

var drawCircles = function(selection, data, xScale, yScale){
	selection.selectAll("circle").data(data)
		.enter()
		.append("circle")
		.classed("circle", true)
		.attr("r", 3)
		.attr("cx", function(d){ return xScale(d)})
		.attr("cy", function(d){ return yScale(3*Math.sin(d)+5)})
};

var appendPath = function(selection, data, line){
	selection.append("path")
		.attr("d", line(data))
		.attr("fill", "None")
		.attr("stroke-width", 3)
		.classed("line", true);
};

var appendArea = function(selection, data, area){
	selection.append("path")
		.attr("d", area(data))
		.attr("fill", "lightsteelblue")
};

var load = function(curve){
	var data = [0,1,2,3,4,5,6,7,8,9,10];

	var line = d3.line()
	        .curve(curve)
			.x(function(d){ return xScale(d)})
			.y(function(d){ return yScale(3*Math.sin(d)+5)});

	var area = d3.area()
	    .curve(curve)
        .x(function(d) { return xScale(d); })
        .y1(function(d) { return yScale(3*Math.sin(d)+5); })
        .y0(INNERHEIGHT)

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

	var xAxisGroup = svg.append("g")
		.call(xAxis)

	var yAxisGroup = svg.append("g")
		.call(yAxis);

	//  draw value line
	appendPath(normalLine, data, line);
	appendArea(normalLine, data, area)
	drawCircles(normalLine, data, xScale, yScale);
	
	//  transition for every element
	transition(normalLine, MARGIN, MARGIN);
	transition(xAxisGroup, MARGIN, INNERHEIGHT + MARGIN);
	transition(yAxisGroup, MARGIN, MARGIN);
};

//window.onload = load;
