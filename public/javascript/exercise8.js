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
		.attr("cx", function(d){ return xScale(d.x)})
		.attr("cy", function(d,i){if(sine){return yScale((Math.sin(i)) + SHIFT*10)}; return yScale(d.y)})
};

var appendPath = function(selection, data, line){
	selection.append("path")
		.attr("d", line(data))
		.classed("line", true);
};

var load = function(curve){
	var data = [{x:0,y:5}, {x:1,y:9}, {x:2,y:7}, {x:3,y:5}, {x:4,y:3},
	            {x:6,y:4}, {x:7,y:2}, {x:8,y:3}, {x:9,y:2}];

	var sineData = [{x:0,y:5}, {x:1,y:9}, {x:2,y:7}, {x:3,y:5}, {x:4,y:3},
    	        {x:5, y:10}, {x:6,y:4}, {x:7,y:2}, {x:8,y:3}, {x:9,y:2}];


	var line = d3.line()
	        .curve(curve)
			.x(function(d){ return xScale(d.x)})
			.y(function(d){ return yScale(d.y)})

	var sine = d3.line()
	        .curve(curve)
			.x(function(d){ return xScale(d.x)})
			.y(function(d,i){ return yScale((Math.sin(i)) + SHIFT*10)})
		
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
	appendPath(sinLine, sineData, sine);
	drawCircles(sinLine, sineData, xScale, yScale, Math.sin)

	//  transition for every element
	transition(normalLine, MARGIN, MARGIN);
	transition(sinLine, MARGIN, MARGIN);
	transition(xAxisGroup, MARGIN, INNERHEIGHT + MARGIN);
	transition(yAxisGroup, MARGIN, MARGIN);
};
