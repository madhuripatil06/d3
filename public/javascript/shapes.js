const SHAPE_SIZE = 100; 
const SVG_WIDTH = 600; 
const SVG_HEIGHT = SHAPE_SIZE;
const MARGIN = 50; 


var translate = function(x,y){
	return "translate(" + x + ", " + y + ")";
}

var drawLine = function(svg){
	svg.append("line")
		.classed("shape", true)
		.attr("x1", SHAPE_SIZE)
		.attr("y1", 0)
		.attr("x2", 0)
		.attr("y2", SHAPE_SIZE)
		.attr("stroke", "black");
}

var drawRect = function(svg){
	svg.append("rect")
		.attr("width", SHAPE_SIZE)
		.attr("height", SHAPE_SIZE)
		.attr("rx", 10)
		.attr("ry", 10)
		.attr("stroke", "blue")
		.classed("shape", true);
}

var drawCircle = function(svg){
	svg.append("circle")
		.attr("r", SHAPE_SIZE/2)
		.attr("cx", SHAPE_SIZE/2)
		.attr("cy", SHAPE_SIZE/2)
		.attr("stroke", "red")
		.classed("shape", true);
}

var drawTriangle = function(svg){
	var points = SHAPE_SIZE/2+",0 0,"+SHAPE_SIZE+" "+SHAPE_SIZE+","+SHAPE_SIZE;
	svg.append("polygon")
		.attr("points", points)
		.attr("stroke", "green")
		.classed("shape", true);
}

var transition = function(){
	d3.selectAll(".shape")
		.transition()
		.duration(2000)
		.attr("transform", function(d, i){ return translate((i*(SHAPE_SIZE+MARGIN)), 0)});
};
var operations = [drawLine, drawRect, drawCircle, drawTriangle];

var load = function(){
	var svg = d3.select(".container").append("svg")
		.attr("height", SVG_HEIGHT)
		.attr("width", SVG_WIDTH);

	for (var i = 0; i < operations.length; i++) {
		operations[i](svg);
	};
	transition();
	
}

window.onload = load;