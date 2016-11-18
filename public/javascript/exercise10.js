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
		.attr("r", 2)
		.attr("cx", function(d){ return xScale(d/10)})
		.attr("cy", function(d){ return yScale((Math.sin(3*d)+1)/2)})
};


var appendPath = function(selection, data, line){
	selection.append("path")
		.attr("d", line(data))
		.style("fill", "none")
		.classed("line", true);
};

var load = function(){
	var data = [0,1,2,3,4,5,6,7,8,9];
	
	var line = d3.line()
			.x(function(d){ return xScale(d/10)})
			.y(function(d){ return yScale((Math.sin(3*d)+1)/2)});

	var xScale = d3.scaleLinear()
		.domain([0,1])
		.range([0,INNERWIDTH]);

	var yScale = d3.scaleLinear()
		.domain([0,1])
		.range([INNERHEIGHT, 0]);

	var xAxis = d3.axisBottom(xScale).ticks(10)
	var yAxis = d3.axisLeft(yScale).ticks(10)
	
	var svg = d3.select(".container").append("svg")
		.attr("height", HEIGHT)
		.attr("width", WIDTH)

	var normalLine = svg.append("g");

	var xAxisGroup = svg.append("g")
		.call(xAxis)

	var yAxisGroup = svg.append("g")
		.call(yAxis);

	//  draw sin value line
	appendPath(normalLine, data, line);
    drawCircles(normalLine, data, xScale, yScale, NaN);

	//  transition for every element
	transition(normalLine, MARGIN, MARGIN);
	transition(xAxisGroup, MARGIN, INNERHEIGHT + MARGIN);
	transition(yAxisGroup, MARGIN, MARGIN);
};

window.onload  =load;
