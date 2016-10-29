var randomNumbers = function(count){
	var result = [];
	for(var i = 0 ; i < count ; i++){
		result.push(Math.ceil(Math.random()*100));
	};
	return result;
}
var data = randomNumbers(10);

var colorScale = d3.scaleLinear()
	.range(["lightsteelblue", "steelblue"])
	.domain([0,100])

var draw = function(data){
	var container = d3.select(".container");
	var bars = container.selectAll("div")
				.data(data, function(d, i){ return d+ ": "+ i})

	bars.enter()
		.append("div")
		.style("width", function(d){ return d*10})
		.classed("bar", true)
		.style("background-color", function(d){ 
			// console.log(colorScale(d))
			return colorScale(d)
			// return d3.rgb(0,0,d+155)
		})
		.text(function(d){ return d});

	bars.exit().remove();

}

var interval = setInterval(function(){
	data.shift();
	data.push(Math.ceil(Math.random()*100))
	draw(data);
}, 500);

