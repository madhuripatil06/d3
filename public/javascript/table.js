var numbers = [1,2,3,4,5,6,7,8,9,10];
var roundLog = function(input){
	return d3.format(".2f")(d3.scaleLog()(input));
};

var appendNewRow = function(name, scale, type){
	var row = d3.select(".myTable").append("tr");
	row.append("th").text(name);
	row.selectAll("td").data(numbers)
		.enter()
		.append(type)
		.text(function(d){ return scale(d)});	
};

var load = function(){
	var table = d3.select(".container").append("table")
		.classed("myTable",true);
	appendNewRow("header", d3.scaleIdentity(), "th");
	appendNewRow("value", d3.scaleIdentity(), "td");
	appendNewRow("square", d3.scalePow().exponent(2), "td");
	appendNewRow("log", roundLog, "td");
	appendNewRow("log", d3.scaleLog().interpolate(d3.interpolateRound), "td");
};

window.onload = load;