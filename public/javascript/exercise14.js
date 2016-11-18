const WIDTH = 600;
const HEIGHT = 600;
const MARGIN = 40;
const SHIFT = 0.5;
const INNERWIDTH = WIDTH - (2*MARGIN);
const INNERHEIGHT = HEIGHT- (2*MARGIN);

const OUTERRADIUS = 200;



var load = function(){
	var data = [1, 1, 2, 2, 1, 2, 1];
	var arcs = d3.pie()(data.map(function(d) { return d; }));

	var svg = d3.select(".container").append("svg")
		.attr("height", HEIGHT)
		.attr("width", WIDTH)

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var arc = d3.arc()
        .outerRadius(OUTERRADIUS)
        .innerRadius(0);

    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d; });

    var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", function(d, i) { return color(i); });

    svg.selectAll(".arc")
      .attr("transform", "translate("+ OUTERRADIUS+", "+OUTERRADIUS+")");
};

window.onload = load;