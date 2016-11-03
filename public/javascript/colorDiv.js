var color = d3.scaleOrdinal(d3.schemeCategory10);
var sortingKeys = ["subject", "score", "name"]

var data = [
    { name: 'ramesh', subject: 'maths', score: 87 },
    { name: 'suresh', subject: 'maths', score: 45 },
    { name: 'pokemon', subject: 'english', score: 65 },
    { name: 'mary', subject: 'kannada', score: 44 },
    { name: 'riya', subject: 'science', score: 72 },
    { name: 'katie', subject: 'social studies', score: 82 },
    { name: 'katie', subject: 'maths', score: 98 },
    { name: 'ramesh', subject: 'bengali', score: 25 },
    { name: 'suresh', subject: 'science', score: 55 },
    { name: 'riya', subject: 'tamil', score: 75 },
    { name: 'pokemon', subject: 'sports', score: 95 },
    { name: 'pokemon', subject: 'social studies', score: 32 }
];


var draw = function(data) {
    var container = d3.select(".container");
    container.style("height", 600)
            .style("width", 700)

    var bars = container.selectAll(".rounded_bar")
        .data(data, function(d, i) {return i + "  "+ d })

    bars.enter()
        .append("div")
        .classed("rounded_bar", true)
        .style("width", function(d) {return d.score * 10 })
        .style("background-color", function(d) {return color(d.subject);})
        .text(function(d) {return d.name + "  " + d.score })

    d3.selectAll(".rounded_bar").style("top", function(d, i) {return (i*50) + "px";});

    bars.exit().remove();
}
var drawSubjects = function(data) {
    var container = d3.select(".subjects");
    container.append("p")
        .text("subjects : ");
    var subjects = d3.map(data, function(d) {return d.subject; }).keys();
    var container = container.selectAll(".subject").data(subjects)


    container.enter()
        .append("div")
        .classed("subject", true)
        .style("height", 30)
        .style("background-color", function(d) {return color(d)})
        .text(function(d) {return d})
}


var sortByKey = function(key) {
    d3.selectAll(".rounded_bar")
        .sort(function(a, b) {
            return d3.ascending(a[key], b[key]);
        })
        .transition().duration(500)
        .style("top", function(d, i) {
            return (i*50) + "px";
        });
};

var sortBySubject = function() {
    sortByKey("subject");
}

var sortByName = function() {
	sortByKey("name");
}

var sortByScore = function() {
    sortByKey("score");
}
var x = function () {
draw(data);
drawSubjects(data);
    
};
x();