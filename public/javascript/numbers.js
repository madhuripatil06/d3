var load = function(){
	var data = [0,1,2,3,4,5,6,7,8,9,10];
	var container = d3.select(".container")
	var sizeScale = d3.scaleLinear()
		.domain([0,10])
		.range([30,180]);

	var numbers = container.selectAll("rect").data(data);
	numbers.enter()
		.append("rect")
        .classed("number", true)
        .text(function(d) {return d})
        .style("text-align", "center")
        .style("font-size",function(d){ return (d+1)*5});
}

window.onload = load;