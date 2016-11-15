const SHAPE_SIZE = 100; 
const SVG_WIDTH = 600; 
const SVG_HEIGHT = 100;
const MARGIN = 50; 

var translate = function(x,y){
	return "translate(" + x + ", " + y + ")";
}

var drawLine = function(svg){
	svg.append("line")
		.classed("shape", true)
		.attr("x1", MARGIN)
		.attr("y1", 0)
		.attr("x2", 0)
		.attr("y2", SHAPE_SIZE)
}

var drawRect = function(svg){
	svg.append("rect")
		.attr("width", SHAPE_SIZE)
		.attr("height", SHAPE_SIZE)
		.attr("rx", 10)
		.attr("ry", 10)
		.classed("shape", true)
		.attr("transform", translate(100,0));
}

var drawCircle = function(svg){
	svg.append("circle")
		.attr("r", 50)
		.classed("shape", true)
		.attr("transform", translate(300,MARGIN));
}

var drawPolygon = function(svg){
	var points = MARGIN+",0 0,"+SHAPE_SIZE+" "+SHAPE_SIZE+","+SHAPE_SIZE;
	svg.append("polygon")
		.attr("points", points)
		.classed("shape", true)
		.attr("transform", translate(400,0));
}
var load = function(){
	var svg = d3.select(".container").append("svg")
		.attr("height", SVG_HEIGHT)
		.attr("width", SVG_WIDTH)
	drawLine(svg);
	drawCircle(svg);
	drawRect(svg);
	drawPolygon(svg);
}

window.onload = load;