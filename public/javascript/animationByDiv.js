var randomNumbers = function(count){
	var result = [];
	for(var i = 0 ; i < count ; i++){
		result.push(Math.ceil(Math.random()*100));
	};
	return result;
}

var draw = function(data){
	var container = d3.select(".container");
	var bars = container.selectAll("div")
				.data(data, function(d, i){ return d})

	bars.enter()
		.append("div")
		.style("width", function(d){ return d*10})
		.classed("bar", true)
		.text(function(d){ return d})

	bars.exit().remove();

}

var data = randomNumbers(10);
var intrval = setInterval(function(){
	data.shift();
	data.push(Math.ceil(Math.random()*100))
	draw(data);
}, 500);

