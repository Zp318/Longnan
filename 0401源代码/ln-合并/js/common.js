
window.log = function(opts){
	  var options = $.extend({
	  	   container: $("body"),
	  	   width    : 200,
	  	   height   : 65,
	  	   title    : "救助贫困妇女和儿童",
	  	   content  : "<span>87.81</span>万人",
	  	   style    :"l"
	  },opts || {});

	  var strokeStyle = "#19588e";
	  var w = options.width,h = options.height;
	  
	  var container = $("<div></div>")
	  .css({
	  	 	width:options.width,
  	 		height:options.height
	  });

	  var p = options.style == "l" ? true : false;

	  var svg = d3.select(container.get(0))
	  .append("svg")
	  .attr("width" , options.width)
	  .attr("height",options.height)
	  .style("position","absolute")
	  .style("top","0")
	  .style("left","0");

	    var defs = svg.append("defs");
	  	
	  	var gradientID = "gradient_" + new Date().getTime();
		var gradient= defs.append("linearGradient")
			.attr("id",gradientID)
			.attr("x1","0")
			.attr("y1","1")
			.attr("x2","1")
			.attr("y2","1");
		gradient.append("stop")
			.attr("stop-color",strokeStyle)
			.attr("offset",0)
			.attr("stop-opacity",p ? 0 : 0.9);
		gradient.append("stop")
			.attr("stop-color",strokeStyle)
			.attr("offset",1)
			.attr("stop-opacity",p ? 0.9 : 0);

	  svg.append("line")
	  	.attr("x1",p ? 0 : w)
	  	.attr("y1",h*0.2)
	  	.attr("x2",p ? w*0.6 : w-w*0.6)
	  	.attr("y2",h*0.2)
	  	.attr("stroke",strokeStyle)
	  	.attr("stroke-width",1);

	  svg.append("line")
	  	.attr("x1",p ? w*0.1 : w-w*0.1)
	  	.attr("y1",0)
	  	.attr("x2",p ? w*0.1 : w-w*0.1)
	  	.attr("y2",h*0.8)
	  	.attr("stroke",strokeStyle)
	  	.attr("stroke-width",1);

	  svg.append("line")
	  	.attr("x1",p ? w*0.15 : w - w * 0.15)
	  	.attr("y1",h*0.9)
	  	.attr("x2", p ? w*0.15+32+8 : w-(w*0.15+32+8))
	  	.attr("y2",h*0.9)
	  	.attr("stroke",strokeStyle)
	  	.attr("stroke-width",4)
	  	.attr("stroke-dasharray","4,4");

	  svg.append("rect")
	  	.attr("x",p ? w*0.1 : w- w*0.1)
	  	.attr("y",h*0.2-4)
	  	.attr("width",6)
	  	.attr("height",6)
	  	.attr("fill","#70c1ff")
	  	.attr("stroke-width",4)
	  	.attr("stroke-dasharray","4,4");

	  svg.append("rect")
	  	.attr("x",p ? w*0.1 : 0)
	  	.attr("y",h*0.35)
	  	.attr("width",w - w*0.1)
	  	.attr("height",h*0.8 - h*0.35 )
	  	.attr("fill","url(#"+gradientID+")")
	  	.attr("stroke-width",4)
	  	.attr("stroke-dasharray","4,4");

	  var title = $("<div>"+options.title+"</div>")
	  .css({
	  	 position:"absolute",
	  	 left:p ? w*0.1 : 0,
	  	 top:-7,
	  	 width:w - w*0.1,
	  	 textAlign: p ? "right" : "left",
	  	 fontSize:14+"px",
	  	 color:"white"
	  })

	  var content = $("<div>"+options.content+"</div>")
	  .css({
	  	 position:"absolute",
	  	 left:w*0.1,
	  	 top:h*0.35,
	  	 width:w - w*0.1,
	  	 height:h*0.8 - h*0.35,
	  	 textAlign:"center"
	  })
	  container.append(title);
	  container.append(content);
	  if(typeof options.container == "string"){
	  	$("#"+options.container).append(container);
	  }else{
		options.container.append(container);
	  }
	 
	  return container;
}
	 	  	
 $(function () {
 	  //小板块标题区效果
 	  $(".plate-title").each(function(i,node){

 	  	    var w = 0;
 	  	    $(node).children().each(function(){
 	  	   		w += $(this).width();
 	  	    });

 	  	    var width = $(this).width() - w - 20;

 	  	    if(width < 0) return
 	  	    var svg = d3.selectAll([node])
	 	  	.append("svg")
	 	  	.attr("width",width)
	 	  	.attr("height","100%")
	 	  	.attr("display","inline-block");

	 	  	var defs = svg.append("defs");

	 	    var gradientID = "gradient_" + new Date().getTime();

			var gradient= defs.append("linearGradient")
				.attr("id",gradientID)
				.attr("x1","0")
				.attr("y1","0")
				.attr("x2","1")
				.attr("y2","0")

			gradient.append("stop")
				.attr("stop-color","white")
				.attr("offset",0)
				.attr("stop-opacity",0);
			gradient.append("stop")
				.attr("stop-color","white")
				.attr("offset",0.5)
				.attr("stop-opacity",0.5);
			
			gradient.append("stop")
				.attr("stop-color","white")
				.attr("offset",1)
				.attr("stop-opacity",0);

		 	var path = d3.path();
		 	  	path.moveTo(0,15)
		 	  	path.lineTo(width,15)
		 	  	path.lineTo(width+1,16)

	 	    svg.append("path")
		 	  	.attr("d",path.toString())
		 	  	.attr("stroke","url(#"+gradientID+")")
		 	  	.attr("stroke-width",10)
		 	  	.attr("stroke-dasharray","3,3")
		 	  	.attr('fill', 'none');
 	  });

 }); 	  
