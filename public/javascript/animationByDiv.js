var draw = function(){
	var container = d3.select(".container");
	var data = [1,2,3,4,5,6,7,8,9,10];

	container.selectAll("div").data(data)
		.enter()
		.append("div")
		.style("width", function(d){ return d*50})
		.classed("bar", true)
}


draw();