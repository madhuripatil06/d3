var numbers = [1,2,3,4,5,6,7,8,9,10];

var appendNewRow = function(name){
	var table = d3.select(".myTable");
	var tr = table.append("tr");
	tr.append("th")
		.html(name);

	return tr.selectAll("td").data(numbers);
};

var drawHeaders = function(){
	var tr = appendNewRow("header");
	tr.enter()
		.append("td")
		.html(function(d){ return d});
};

var drawNumbers = function(){
	appendNewRow("value").enter()
		.append("td")
		.html(function(d){ return d});
};

var drawSquares = function(){
	var square = d3.scalePow().exponent(2);
	appendNewRow("square").enter()
		.append("td")
		.html(function(d){ return square(d)});
};

var drawLog = function(){
	var logScale = d3.scaleLog();
	appendNewRow("log(n)").enter()
		.append("td")
		.html(function(d){ return d3.format(".5f")(logScale(d))});
};

var drawRoundLog = function(){
	var log = d3.scaleLog();
	var round = d3.scaleQuantize();
	appendNewRow("round(log(n))").enter()
		.append("td")
		.html(function(d){ return round(log(d))});
};

var load = function(){
	var table = d3.select("body").append("table")
		.classed("myTable",true);

	drawHeaders();
	drawNumbers();
	drawSquares();
	drawLog();
	drawRoundLog();
};

load();