var randomNumbers = function(count){
	var result = [];
	for(var i = 0 ; i < count ; i++){
		result.push(Math.ceil(Math.random()*100));
	};
	return result;
}

var draw = function(){
	var container = d3.select(".container");
	var data = randomNumbers(10);

	container.selectAll("div").data(data)
		.enter()
		.append("div")
		.style("width", function(d){ return d*10})
		.classed("bar", true)
		.text(function(d){ return d})
}


window.onload = draw();