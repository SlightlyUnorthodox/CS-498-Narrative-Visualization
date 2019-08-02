dataset = {
    'children': [
{'Publisher':'3DO','Games':10,'Sales':3.08},
{'Publisher':'Acclaim Entertainment','Games':15,'Sales':5.59},
{'Publisher':'Activision','Games':13,'Sales':14.48},
{'Publisher':'Aruze Corp','Games':2,'Sales':0.64},
{'Publisher':'Asmik Ace Entertainment','Games':1,'Sales':0.09},
{'Publisher':'Atari','Games':2,'Sales':4.81},
{'Publisher':'Atlus','Games':1,'Sales':0.35},
{'Publisher':'BAM! Entertainment','Games':1,'Sales':0.11},
{'Publisher':'Banpresto','Games':1,'Sales':0.8},
{'Publisher':'Capcom','Games':5,'Sales':2.02},
{'Publisher':'ChunSoft','Games':1,'Sales':0.37},
{'Publisher':'Codemasters','Games':2,'Sales':1.02},
{'Publisher':'Crave Entertainment','Games':3,'Sales':2.44},
{'Publisher':'D3Publisher','Games':1,'Sales':0.07},
{'Publisher':'Eidos Interactive','Games':9,'Sales':4.56},
{'Publisher':'Electronic Arts','Games':31,'Sales':25.13},
{'Publisher':'Empire Interactive','Games':4,'Sales':1.14},
{'Publisher':'Enix Corporation','Games':3,'Sales':5.36},
{'Publisher':'Epoch','Games':1,'Sales':0.15},
{'Publisher':'Fox Interactive','Games':1,'Sales':0.16},
{'Publisher':'Hasbro Interactive','Games':4,'Sales':1.33},
{'Publisher':'Havas Interactive','Games':1,'Sales':0.13},
{'Publisher':'Hudson Soft','Games':1,'Sales':0.16},
{'Publisher':'Imagineer','Games':1,'Sales':0.27},
{'Publisher':'Infogrames','Games':11,'Sales':1.66},
{'Publisher':'Interplay','Games':3,'Sales':1},
{'Publisher':'JVC','Games':1,'Sales':0.06},
{'Publisher':'Konami Digital Entertainment','Games':31,'Sales':8.47},
{'Publisher':'LucasArts','Games':1,'Sales':0.26},
{'Publisher':'Mattel Interactive','Games':2,'Sales':0.23},
{'Publisher':'Media Factory','Games':1,'Sales':0.14},
{'Publisher':'Microsoft Game Studios','Games':1,'Sales':0.99},
{'Publisher':'Midas Interactive Entertainment','Games':7,'Sales':1.09},
{'Publisher':'Midway Games','Games':12,'Sales':4.2},
{'Publisher':'Mindscape','Games':1,'Sales':0.02},
{'Publisher':'Namco Bandai Games','Games':14,'Sales':9.7},
{'Publisher':'Natsume','Games':1,'Sales':0.27},
{'Publisher':'NEC Interchannel','Games':2,'Sales':0.14},
{'Publisher':'Nintendo','Games':23,'Sales':34.05},
{'Publisher':'Pony Canyon','Games':1,'Sales':0.05},
{'Publisher':'Psygnosis','Games':1,'Sales':0.12},
{'Publisher':'Sega','Games':11,'Sales':3.88},
{'Publisher':'SNK','Games':2,'Sales':0.18},
{'Publisher':'Sony Computer Entertainment','Games':32,'Sales':21.69},
{'Publisher':'SquareSoft','Games':4,'Sales':6.55},
{'Publisher':'Success','Games':1,'Sales':0.01},
{'Publisher':'Sunrise Interactive','Games':2,'Sales':0.13},
{'Publisher':'Sunsoft','Games':1,'Sales':0.25},
{'Publisher':'Swing! Entertainment','Games':2,'Sales':0.18},
{'Publisher':'Take-Two Interactive','Games':6,'Sales':6.03},
{'Publisher':'TDK Core','Games':1,'Sales':0.18},
{'Publisher':'Tecmo Koei','Games':10,'Sales':1.87},
{'Publisher':'The Learning Company','Games':1,'Sales':0.05},
{'Publisher':'THQ','Games':15,'Sales':15.86},
{'Publisher':'Titus','Games':2,'Sales':0.08},
{'Publisher':'Ubisoft','Games':21,'Sales':4.75},
{'Publisher':'Vatical Entertainment','Games':2,'Sales':0.22},
{'Publisher':'Victor Interactive','Games':1,'Sales':0.18},
{'Publisher':'Video System','Games':1,'Sales':0.11},
{'Publisher':'Virgin Interactive','Games':6,'Sales':2.55},
{'Publisher':'Vivendi Games','Games':1,'Sales':0.1}
    ]};

var tooltip2 = d3.select("#scene2")
.append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "black")
  .style("border-radius", "5px")
  .style("padding", "10px")
  .style("color", "white")

var showTooltip2 = function(d) {
tooltip2
  .transition()
  .duration(200)
tooltip2
  .style("opacity", 1)
  .html("Publisher: " + d.data.Publisher + "<br/>Games: " + d.data.Games + "<br/>Sales (Millions of Copies): " + d.data.Sales)
  .style("left", (d3.mouse(this)[0]) + "px")
  .style("top", (d3.mouse(this)[1]) + "px")
}
var moveTooltip2 = function(d) {
tooltip2
  .style("left", (d3.mouse(this)[0]) + "px")
  .style("top", (d3.mouse(this)[1]) + "px")
}
var hideTooltip2 = function(d) {
tooltip2
  .transition()
  .duration(200)
  .style("opacity", 0)
}

var diameter = 500;
var color = d3.scaleOrdinal(d3.schemeCategory20);

var bubble = d3.pack(dataset)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("#scene2")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");
    
var nodes = d3.hierarchy(dataset)
    .sum(function(d) { return d.Sales; });

var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function(d){
        return  !d.children
    })
    .append("g")
    .attr("class", "node")
    .on("mouseover", showTooltip2)
    .on("mousemove", moveTooltip2)
    .on("mouseleave", hideTooltip2)
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

node.append("title")
    .text(function(d) {
        return d.data.Publisher + ": " + d.data.Sales;
    });

node.append("circle")
    .attr("r", function(d) {
        return d.r;
    })
    .style("fill", function(d,i) {
        return color(i);
    });

node.append("text")
    .attr("dy", ".2em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.Publisher.substring(0, d.r / 3);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", function(d){
        return d.r/5;
    })
    .attr("fill", "white");

node.append("text")
    .attr("dy", "1.3em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.Sales;
    })
    .attr("font-family",  "Gill Sans", "Gill Sans MT")
    .attr("font-size", function(d){
        return d.r/5;
    })
    .attr("fill", "white");

d3.select(self.frameElement)
    .style("height", diameter + "px");

