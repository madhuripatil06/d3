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
}

var load = function(){
	var data = [[0,5], [1,9], [2,7], [3,5], [4,3], [6,4], [7,2], [8,3], [9,2]];
	var xScale = d3.scaleLinear()
		.domain([0,1])
		.range([0,INNERWIDTH]);

	var yScale = d3.scaleLinear()
		.domain([0,1])
		.range([INNERHEIGHT, 0]);

	var xAxis = d3.axisBottom(xScale).ticks(10)
	var yAxis = d3.axisLeft(yScale).ticks(10)

	var line = d3.line()
		.x(function(d){ return xScale(d[0]/10)})
		.y(function(d){ return yScale(d[1]/10)})

	
	var svg = d3.select(".container").append("svg")
		.attr("height", HEIGHT)
		.attr("width", WIDTH)

	var normalLine = svg.append("g");

	normalLine.append("path")
		.attr("d", line(data))
		.classed("line", true)
	
	normalLine.selectAll("circle").data(data)
		.enter()
		.append("circle")
		.classed("circle", true)
		.attr("r", 2)
		.attr("cx", function(d){ return xScale(d[0]/10)})
		.attr("cy", function(d){ return yScale(d[1]/10)})

	var sinLine = svg.append("g");
	
	var sine = d3.line()
		.x(function(d){ return xScale(d[0]/10)})
		.y(function(d){ return yScale((Math.sin(d[0])/10) + SHIFT)})
	
	sinLine.append("path")
		.attr("d", sine(data))
		.classed("line", true)

	sinLine.selectAll("circle").data(data)
		.enter()
		.append("circle")
		.classed("circle", true)
		.attr("r", 2)
		.attr("cx", function(d){ return xScale(d[0]/10)})
		.attr("cy", function(d){ return yScale((Math.sin(d[0])/10) + SHIFT)})



	var xAxisGroup = svg.append("g")
		.call(xAxis)

	var yAxisGroup = svg.append("g")
		.call(yAxis);

	transition(normalLine, MARGIN, MARGIN);
	transition(sinLine, MARGIN, MARGIN);
	transition(xAxisGroup, MARGIN, INNERHEIGHT + MARGIN);
	transition(yAxisGroup, MARGIN, MARGIN);
};



window.onload = load;