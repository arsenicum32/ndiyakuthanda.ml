var dat = {
	ars: {
		arr: [
			550,
			448,
			192,
			35928,
			11940,
			25137,
			622,
			39902,
			9746,
			130,
			32,
			8,
			10,
			2,
			20,
			2,
			6,
			34,
			17,
			14,
			4,
			18,
			4,
			24,
			14,
			192,
			34,
			64,
			80,
			60,
			8,
			42,
			10,
			32,
			18,
			82,
			44,
			0,
			22,
			12,
			41
		],
		"maxtime": 39902,
		"middle": 3062
	},
	"masha": {
		"arr": [
			20054,
			27634,
			2608,
			5872,
			35534,
			9150,
			30364,
			23928,
			4052,
			152,
			110,
			10,
			10,
			62,
			6,
			6,
			22,
			51,
			8,
			6,
			2,
			18,
			10,
			4,
			142,
			53024,
			140,
			28,
			60,
			4,
			44,
			22,
			10,
			8,
			76,
			32,
			16,
			18,
			12,
			34,
			36
		],
		"maxtime": 53024,
		"middle": 5204
	}
}

var x = d3.time.scale()
    .range([0, window.innerWidth / dat.ars.arr.length ]);

var y = d3.scale.linear()
    .range([window.innerHeight/2, 0]);

var line = d3.svg.line()
    .interpolate("basis")  
    .x(function(d,i) { return x(i); })
    .y(function(d) { return window.innerHeight/4*3 - d/180; });

var svg = d3.select("body").append("svg")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight)
  .append("g");

svg.append("path")
      .datum( dat.ars.arr.reverse() )
      .attr("class", "line")
      .attr("d", line);

svg.append("path")
      .datum( dat.masha.arr.reverse() )
      .attr("class", "line2")
      .attr("d", line);

setTimeout(function(){
  svg.select('.line2').transition().style('stroke-width', 4)
  setTimeout(function(){
    svg.select('.line2').transition().style('stroke-width', 1.5)
    setTimeout(function(){
      svg.select('.line').transition().style('stroke-width', 4)
      setTimeout(function(){
        svg.select('.line').transition().style('stroke-width', 1.5)
      },1000)
    },1000)
  },1000)
},1000)