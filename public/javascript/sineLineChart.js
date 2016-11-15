const WIDTH = 1000;
const HEIGHT = 1000;

var load = function(){
	var data = [[0,5], [1,9], [2,7], [3,5], [4,3], [6,4], [7,2], [8,3], [9,2]];
	var scale = d3.scaleLinear()
		.domain([0,10])
		.range([10,110]);

	var line = d3.line()
		.x(function(d){ return scale(d[0])})
		.y(function(d){ return 110 - scale(d[1])})


	var svg = d3.select(".container").append("svg")
		.attr("height", HEIGHT)
		.attr("width", WIDTH);

	svg.selectAll("circle").data(data)
		.enter()
		.append("circle")
		.attr("r", 2)
		.attr("cx", function(d){ return scale(d[0])})
		.attr("cy", function(d){ return 110 - scale(d[1])})

	svg.append("path")
		.attr("d", line(data))
		.style("fill", "none")
		.style("stroke", "black")
};

window.onload = load;