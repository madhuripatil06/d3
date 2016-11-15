var load = function(){
	var data = [0,1,2,3,4,5,6,7,8,9,10];
	var container = d3.select(".container")
	var sizeScale = d3.scaleLinear()
		.domain([0,100])
		.range(["italic bold 12px/30px Georgia, serif","italic bold 120px/180px Georgia, serif"])

	var numbers = container.selectAll("rect").data(data);
	numbers.enter()
		.append("rect")
        .classed("number", true)
        .text(function(d) {return d})
        .style("text-align", "center")
        .style("font",function(d){ return sizeScale(d)});
}

window.onload = load;