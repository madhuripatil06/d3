var numbers = [1,2,3,4,5,6,7,8,9,10];

var appendNewRow = function(name, scale){
	var tr = d3.select(".myTable").append("tr");
	tr.append("th").text(name);
	tr.selectAll("td").data(numbers)
		.enter()
		.append("td")
		.text(function(d){ return scale(d)});	
};

var load = function(){
	var table = d3.select(".container").append("table")
		.classed("myTable",true);
	appendNewRow("header", d3.scaleIdentity());
	appendNewRow("value", d3.scaleIdentity());
	appendNewRow("square", d3.scalePow().exponent(2));
	appendNewRow("log", d3.scaleLog());
	appendNewRow("log", d3.scaleLog());
};

window.onload = load;