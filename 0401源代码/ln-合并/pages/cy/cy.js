require(["zrender",
	'zrender/shape/Polygon',
	'zrender/shape/Image',
	'zrender/shape/Text',
	'zrender/tool/color',
	"zrender/shape/ShapeBundle",
	"zrender/Group",
	"zrender/shape/Path",
	"zrender/shape/Ring",
	"zrender/shape/Sector",
	"zrender/shape/Circle",
	"zrender/shape/Polyline"], 
	function (
		zrender,
		Polygon,
		ImageShape,
		Text,
		color,
		ShapeBundle,
		Group,
		Path,
		Ring,
		Sector,
		Circle,
		Polyline
) {

		$.when($.get("../../json/621200.json"),$.get("../../json/products.json"))
		.done(function(longnan,products){
			echarts.registerMap("陇南0",(typeof longnan[0] == "string" ? $.parseJSON(longnan[0]):longnan[0]));
			echarts.registerMap("陇南1",(typeof longnan[0] == "string" ? $.parseJSON(longnan[0]):longnan[0]));
			echarts.registerMap("陇南2",(typeof longnan[0] == "string" ? $.parseJSON(longnan[0]):longnan[0]));
			echarts.registerMap("特色农产品",(typeof products[0] == "string" ? $.parseJSON(products[0]):products[0]));

			var mapOption = {
			    geo:{
			    	left: 0, top: 0, right: 0, bottom: 0,
			    	boundingCoords: [
					    [104.02085527656433, 34.533843703256665],  
					    [106.58169505195161, 32.46028246681772]
					]
			    },
			    series:[{
			    	type:"map",
			    	map: '陇南0',
			        roam: false,
			        left: 0, top: 0, right: 0, bottom: 50,
			        label: {
			            normal: {
			                show: false,
			                
			            }
			        },
			        itemStyle: {
			            normal:{
			            	areaColor:"#2195cc",
			                borderColor: 'white',
			                shadowColor: 'rgba(0, 0, 0, 0.4)',
    						shadowBlur: 5,
    						shadowOffsetX:-20,
    						shadowOffsetY:40
			            },
			            emphasis:{
			            	areaColor:"#2195cc",
			            }
			        },
			        z:0,
			        zlevel:1
			    },{
			    	type:"map",
			    	map: '陇南1',
			        roam: false,
			        left: 0, top: 0, right: 0, bottom: 50,
			        label: {
			            normal: {
			                show: false, 
			            }
			        },
			        itemStyle: {
			            normal:{
			            	areaColor:"#2195cc",
			                borderColor: 'white',
			                shadowColor: '#1c7eac',
    						shadowBlur: 0,
    						shadowOffsetY:15,

			            },
			            emphasis:{
			            	areaColor:"#2195cc",
			            }
			        },
			        z:1,
			        zlevel:2
			    },{
			    	type:"map",
			    	map: '陇南2',
			        roam: false,
			        left: 0, top: 0, right: 0, bottom: 50,
			        label: {
			            normal: {
			                show: false
			            }
			        },
			        itemStyle: {
			            normal:{
			            	areaColor:"#2195cc",
			                borderColor: 'white',
			            },
			            emphasis:{
			            	areaColor:"#2195cc",
			            }
			        },
			        z:2,
			        zlevel:3
			    },{
		            name: '陇南市',
		            type: 'effectScatter',
		            coordinateSystem: 'geo',
		            geoIndex:0,
		            data: [{
		            	name:"陇南市",
		            	value:[104.9282260249,33.4067994808]
		            }],
		            symbolSize: 8,
		            showEffectOn: 'render',
		            rippleEffect: {
		                brushType: 'fill',
		                scale:15
		            },
		            hoverAnimation: true,
		            label: {
		                normal: {  
		                    show: true,
		                    formatter:"{b}",
		                    color:"white",
		                    offset:[0,30]
		                }
		            },
		            itemStyle: {
		                normal: {
		                    color: 'black',
		                    shadowBlur: 10,
		                    shadowColor: 'black'
		                }
		            },
		            z:3,
		            zlevel: 4
		        },{
		            name: '陇南市',
		            type: 'scatter',
		            coordinateSystem: 'geo',
		            geoIndex:0,
		            data:[{
		            	name:"陇南市",
		            	value:[104.9282260249,33.4067994808]
		            }],
		            symbolSize:8,
		            itemStyle: {
		                normal: {
		                    color: 'red',
		                    shadowBlur: 10,
		                    shadowColor: 'red'
		                }
		            },
		            z:4,
		            zlevel: 5
		        }]
			    
			}

			var products = (function(){
			return {
				render:function(){
					this.mapOption = $.extend(true,{},mapOption);
					var chart = echarts.init($("#baseMap").get(0));
					chart.setOption(mapOption);
					var _this = this;
					this.chart = chart;
					var mapJson = this.mapJson =  echarts.getMap("特色农产品");
					var uuid = this.id = "map_" + new Date().getTime();
					var html = "<div id='"+uuid+"'  style='width:100%;height:100%;position:absolute;left:0;top:0'></div>"
					var dom = "#productsArea";
					$(dom).append(html).css("position","absolute");

					var _this = this;
					var zr = zrender.init(document.getElementById(uuid));
					this.zr = zr;
					
					this.draw(mapJson);
					this.context = $("#"+uuid + " canvas").get(0).getContext("2d");

					this.drawIcon()(function(){
						_this.drawText();
						zr.render();
					});
				},
				draw:function(mapJson){
					var _this = this;
					if(mapJson.geoJson && mapJson.geoJson.features){
						var i = 0 , fl = mapJson.geoJson.features.length;
						var j = 0 , coordinates,feature,cl,coordinate;
						while(i < fl){
							feature = mapJson.geoJson.features[i];
							coordinates = feature.geometry.coordinates;
							cl = coordinates.length;
							j = 0;
							while(j < cl){
								coordinate = coordinates[j];
								this.drawGraph(j,coordinate,feature.properties);
								j++;
							}
							i ++;
						}
					}
				},
				drawGraph:function(i,coordinates,properties){
					var i = 0 ,len = coordinates.length,coordinate;
					var color;
					switch(properties.name){
						case 1:{
							color = "rgba(222,205,159,0.7)";
							break;
						}
						case 2:{
							color = "rgba(239,159,123,0.7)";
							break;
						}
						case 3:{
							color = "rgba(191,165,118,0.7)";
							break;
						}
						case 4:{
							color = "rgba(242,106,32,0.7)";
							break;
						}
						case 5:{
							color = "rgba(104,6,8,0.7)";
							break;
						}
						case 6:{
							color = "rgba(116,143,40,0.7)";
							break;
						}
					}


					var zr = this.zr;
						var i = 0 ,len = coordinates.length,coordinate;

					var pointsList = [];
					while(i < len){
						coordinate = coordinates[i];
						var px  = this.getPx(coordinate);
						pointsList.push(px);
						i++;
					}
					zr.addShape(
						new Polygon({
					        style : {
					            pointList:pointsList,
					            color : color
					        }
					    })
					);

				},
				drawIcon:function(){
					var features = [ 
						{properties:{"name": 1},coordinate:[105.83129882812499,33.813384329112786]},
						{properties:{"name": 2},coordinate:[105.14465332031249, 34.07086232376631]},
						{properties:{"name": 3},coordinate:[105.65826416015625, 33.12145055836598]},
						{properties:{"name": 4},coordinate:[104.468994140625,33.99347299511967]},
						{properties:{"name": 5},coordinate:[105.14465332031249,33.516209361109055]},
						{properties:{"name": 6},coordinate:[105.02655029296875,33.23179557851464]}
					];
					var _this = this;
					var i = 0 ,len = features.length;
					var onloadNum = 0;
					var onload = null;
					while (i < len){
						(function(i){
							var px = _this.getPx(features[i].coordinate);
							var img = new Image();
							switch(features[i].properties.name){
								case 1 :{
									img.src = "../../img/l01.png";
									break;
								}
								case 2 :{
									img.src = "../../img/l04.png";
									break;
								}
								case 3 :{
									img.src = "../../img/l05.png";
									break;
								}
								case 4 :{
									img.src = "../../img/l06.png";
									break;
								}
								case 5 :{
									img.src = "../../img/l03.png";
									break;
								}
								case 6 :{
									img.src = "../../img/l02.png";
									break;
								}
							}
							img.onload = function(){
								_this.zr.addShape(new ImageShape({
							        style: {
							            image: img,
							            x: px[0]-32,
							            y: px[1]-32
							        }
							    }));
								onloadNum++;
								if(onloadNum == len){
									onload();
								}
							}
							img.onerror = function (e) {
								console.log(e);
							}
						})(i);
						i++;
					}
					return function(callback){
						onload = callback;
					}
				},

				drawText:function(){
					//this.mapOption.series[2].label.normal.show = false;
					//this.chart.setOption(this.mapOption);
					var features = [ 
						{properties:{"name": "宕昌县"},coordinate:[104.53216552734375,33.970697997361626]},
						{properties:{"name": "礼县"},coordinate:[104.94964599609374,34.0822371521209]},
						{properties:{"name": "西河县"},coordinate:[105.31768798828125,33.93196649986436]} ,
						{properties:{"name": "成县"},coordinate:[ 105.67474365234374,33.73347670599252]} ,
						{properties:{"name": "徽县"},coordinate:[106.0125732421875,33.88865750124075]} ,
						{properties:{"name": "两当县"},coordinate:[106.31744384765625,33.904616008362325]} ,
						{properties:{"name": "康县"},coordinate:[105.567626953125,33.23868752757414]},
						{properties:{"name": "武都区"},coordinate:[105.18585205078125,33.19732768648872]},
						{properties:{"name": "文县"},coordinate:[104.72442626953124,32.9257074887604]}
					];
					var i = 0 ,len = features.length,px;
				
					while (i < len){
						px = this.getPx(features[i].coordinate);
						this.zr.addShape(
							new Text({
						        style: {
						            text: features[i].properties.name || "",
						            x: px[0]-12,
						            y: px[1],
						            color:"white",
						            textFont: '13px 微软雅黑',

						        },
						        hoverable:false
						    })
						)
						i++;
					}
				},
				getPx:function(points){
					return this.chart.convertToPixel('geo',points);
				},
				refresh:function(){
					$("#"+this.id).empty();
					this.render();
				}
			}

		})();

		products.render();

		chart_1();
		chart_2();
		chart_3();
		chart_4();
		chart_5();
		chart_6();
		chart_7();
		chart_8();
		chart_9();
		chart_10();
		chart_11();
		chart_12();
		chart_13();

		function chart_1() {
			
			//嵌套饼图2
			var zr = zrender.init(document.getElementById("rk"))
			var width = $("#rk").width(),height = $("#rk").height();
			
			var x = width/2 -100, y = height /2 ;

			var r0 = 30 , r = 70;

			var data_out = [
				{name:'第一产业',value:30.31},
				{name:'第二产业',value:32.93},
				{name:'第三产业',value:171.89}
			];
			//增速的占比
			var data_inner = [
				{name:'第一产业',value:6.0},
				{name:'第二产业',value:9.9},
				{name:'第三产业',value:10.8}
			];

			var colors = ["#51fba2","#43d6e6","#ffa901"];
			var i = 0 ;
			var sumi = d3.sum(data_inner,function(d){return d.value}); 
			var sumo = d3.sum(data_out,function(d){return d.value});

			var angle = d3.scaleLinear().domain([0,sumi]).range([0, 360 ]);

			var shapes = [];
			var stack = -90;
			var startAngle,endAngle;
			while (i < data_inner.length){
				startAngle = stack;
				stack += angle(data_inner[i].value);
				endAngle = stack;
				shapes.push(new Sector({
				    style : {
				        x : x,
				        y : y,
				        r0 : r0,
				        r :  r,
				        clockWise:true,
				        startAngle : startAngle ,
	        			endAngle   : endAngle,
				        brushType : 'fill',
				        color : colors[i] || "black"
				    },
				    hoverable:false
				}));

				shapes.push(new Text({
					style: {
			            text: data_inner[i].name,
			            x: x + 200,
			            y: 30 + 80 * i,
			            textFont: '16px Arial',
			            color:colors[i]
			        }
				}));
				shapes.push(new Text({
					style: {
			            text: data_out[i].value + "亿元",
			            x: x + 200,
			            y: 30 + 80 * i + 20 + 10,
			            textFont: 'bold 16px Arial',
			            color:colors[i]
			        }
				}));

				shapes.push(new Text({
					style: {
			            text: data_inner[i].value + "%",
			            x: x + 200 + 25,
			            y: 30 + 80 * i + 20 + 20 + 15,
			            textFont: 'bold 16px Arial',
			            color:colors[i]
			        }
				}));

				shapes.push(new ImageShape({
			        style: {
			            image: "./imgs/icon_"+(i+1) + ".png",
			            x: x + 200,
			            y: 30 + 80 * i + 20 + 20+4
			        }
			    }));

				i ++;
			}

			var jx = 3;
			var angle1 = d3.scaleLinear().domain([0,sumo]).range([0, 360-  (data_out.length-1)*jx]);
			var dr = r - r0;
			i = 0;
			stack = -90;
			r0 = r + 5;
			r  = r0 + dr;
			var attendValue = 0;//衰减值

			while (i < data_out.length){
				startAngle = stack;
				stack += angle1(data_out[i].value);
				endAngle = stack;
				shapes.push(new Sector({
				    style : {
				        x : x,
				        y : y,
				        r0 : r0 + attendValue/2,
				        r :  r - attendValue/2,
				        clockWise:true,
				        startAngle : startAngle + jx*i,
	        			endAngle   : endAngle + jx*i + (i == data_out.length -1 ? -jx : 0),
				        brushType : 'fill',
				        color : colors[i] || "black"
				    },
				    hoverable:false
				}));
				
				var pointList;
				var sx,sy;
				if(endAngle <= 0 && startAngle >= -90){
					sx = x + (r - attendValue/2)*Math.cos(Math.PI * -(endAngle - 10)/180);
					sy = y - (r - attendValue/2)*Math.sin(Math.PI * -(endAngle - 10)/180);
					pointList = [[sx, sy],[sx + 20,30 + 30 + 80 * i],[x + 200, 30 + 30 + 80 * i]];
				}
				else if(startAngle < 90 && endAngle > 90){
					sx = x + (r - attendValue/2)*Math.cos(Math.PI * -(startAngle + (90-startAngle)/2)/180);
					sy = y - (r - attendValue/2)*Math.sin(Math.PI * -(startAngle + (90-startAngle)/2)/180);
					pointList = [[sx, sy],[sx + 20,30 + 30 + 80 * i],[x + 200, 30 + 30 + 80 * i]];
				}else if(startAngle < 90 && endAngle < 90){
					sx = x + (r - attendValue/2)*Math.cos(Math.PI * -(startAngle + (endAngle-startAngle)/2)/180);
					sy = y - (r - attendValue/2)*Math.sin(Math.PI * -(startAngle + (endAngle-startAngle)/2)/180);
					pointList = [[sx, sy],[sx + 20,30 + 30 + 80 * i],[x + 200, 30 + 30 + 80 * i]];
				}else if(startAngle > 90 && endAngle > 90){

				}

				shapes.push(new Polyline({
			        style: {
			            pointList: pointList,
			            strokeColor: "#435b84",
			            smooth:"",
			            lineWidth:1
			        },
			        hoverable:false
			    }))

			    attendValue = (r - r0 + attendValue)*2/5;
				i ++;
			}

			i = 0;
			while ( i < shapes.length){
				zr.addShape(shapes[i]);
				i++;
			}
				
			

		}

		function chart_2() {
		  	var chart = echarts.init($("#sc").get(0));
			var option = {
			    color: ['#3398DB'],
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    grid: {
			        left: '0%',
			        right: '0%',
			        bottom: '15%',
			        containLabel: false
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : ['武都', '成县', '礼县', '西和', '文县', '徽县','两当','宕县','康县'],
			            splitLine:{
			            	show:false
			            },
			            axisTick:{
			            	show:false
			            },
			            axisLabel:{
			            	interval:0,
			            	textStyle:{
			            		color:"white",
			            		fontSize:16
			            	}
			            },
			            axisLine:{
			            	show:false
			            }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            splitLine:{
			            	show:false
			            },
			            axisTick:{
			            	show:false
			            },
			            axisLabel:{
			            	show:false
			            },
			            axisLine:{
			            	show:false
			            }
			        }
			    ],
			    series : [
			        {
			            name:'直接访问',
			            type:'bar',
			            barWidth: '30',
			            data:[150, 100, 40, 98, 61, 120, 180 ,53 , 132],
			            label:{
			            	normal:{
			            		show:true,
			            		position:"top",
			            		formatter:function (d) {
			            			return d.value + "个"	
			            		},
			            		textStyle:{
			            			color:"white",
			            			fontSize:16
			            		}
			            	}
			            },
			            itemStyle:{
			            	normal:{
			            		borderColor:"#237282",
			            		borderWidth:1,
			            		color:function (a,b) {
			            			return {
									    type: 'linear',
									    x: 0,
									    y: 1,
									    x2: 0,
									    y2: 0,
									    colorStops: [{
									        offset: 0, color: 'rgba(38,123,138,1)' // 0% 处的颜色
									    },{
									        offset: 1, color: 'rgba(38,123,138,0)' // 100% 处的颜色
									    }],
									    globalCoord: false // 缺省为 false
										
					            	}
			            		}
			            	}
			            }
			        }
			    ]
			};
			chart.setOption(option);
		}

		function chart_3() {
			nestedPieGraph({
				dom:"qy_pie",
				data:[
					{
						name :"新增规上工业企业",value:1419,color:"#ffa901",textColor:"#ffffff"
					},
					{
						name:"新培育小微企业",value:1698,color:"#51fba2",textColor:"#ffffff"
					},
					{
						name:"新增企业",value:3198,color:"#43d6e6",textColor:"#ffffff"
					}
				],
				styles:{
					x:$("#qy_pie").width()/4,
					y:$("#qy_pie").height()/2,
					animation:2000,
					dr:12,
					ir:25,
				}
			});
			
		}
		function chart_4() {

			var lineData = [150+50, 130+50, 138+50, 123+50, 128+50, 168+50, 124+50, 105+50, 125+50]

			var option = {
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    color:["#42d6e5","#50fba1","#f58800"],
			    legend: {
			        data:['新增企业','新增规上工业企业','新培育小微企业'],
			        textStyle:{
			        	color:"white",
			        	fontSize:16
			        },
			        itemHeight:5,
			        right:0,
			        top:10
			    },
			    grid: {
			        left: '0%',
			        right: '0%',
			        bottom: '0%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : ['成都区','成县','礼县','西和县','文县','徽县','两当县','宕昌县','康县'],
			            splitLine:{
			            	show:false
			            },
			            axisTick:{
			            	show:false
			            },
			            axisLabel:{
			            	interval:0,
			            	textStyle:{
			            		color:"white",
			            		fontSize:16
			            	}
			            },
			            axisLine:{
			            	show:false
			            }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            splitLine:{
			            	show:false
			            },
			            axisTick:{
			            	show:false
			            },
			            axisLabel:{
			            	show:false
			            },
			            axisLine:{
			            	show:false
			            }
			        }
			    ],
			    series : [
			        {
			            name:'新增企业',
			            type:'bar',
			            data:[150, 130, 138, 123, 128, 168, 124, 105, 125],
			            label:{
			            	normal:{
			            		show:true,
			            		position:"top",
			            		textStyle:{
			            			color:"white",
			            			fontSize:16
			            		}
			            	}
			            },
			            itemStyle:{
			            	normal:{
			            		borderColor:"#237282",
			            		borderWidth:1,
			            		color:function (a,b) {
			            			return {
									    type: 'linear',
									    x: 0,
									    y: 1,
									    x2: 0,
									    y2: 0,
									    colorStops: [{
									        offset: 0, color: 'rgba(38,123,138,1)' // 0% 处的颜色
									    },{
									        offset: 1, color: 'rgba(38,123,138,0)' // 100% 处的颜色
									    }]
					            	}
			            		}
			            	}
			            },
			            barWidth:16
			        },
			        {
			            name:'新增规上工业企业',
			            type:'bar',
			            data:[80, 56, 48, 83, 40, 84, 66, 39, 76],
			            label:{
			            	normal:{
			            		show:true,
			            		position:"top",
			            		textStyle:{
			            			color:"white",
			            			fontSize:16
			            		}
			            	}
			            },
			            itemStyle:{
			            	normal:{
			            		borderColor:"#277d5d",
			            		borderWidth:1,
			            		color:function (a,b) {
			            			return {
									    type: 'linear',
									    x: 0,
									    y: 1,
									    x2: 0,
									    y2: 0,
									    colorStops: [{
									        offset: 0, color: 'rgba(39,125,93,1)' // 0% 处的颜色
									    },{
									        offset: 1, color: 'rgba(39,125,93,0)' // 100% 处的颜色
									    }]
					            	}
			            		}
			            	}
			            },
			            barWidth:16
			        },
			        {
			            name:'新培育小微企业',
			            type:'bar',
			            data:[20,20,20,20,20,20,20,20,20],
			            label:{
			            	normal:{
			            		show:true,
			            		position:"top",
			            		textStyle:{
			            			color:"white",
			            			fontSize:16
			            		}
			            	}
			            },
			            itemStyle:{
			            	normal:{
			            		borderColor:"#845118",
			            		borderWidth:1,
			            		color:function (a,b) {
			            			return {
									    type: 'linear',
									    x: 0,
									    y: 1,
									    x2: 0,
									    y2: 0,
									    colorStops: [{
									        offset: 0, color: 'rgba(132,81,24,1)' // 0% 处的颜色
									    },{
									        offset: 1, color: 'rgba(132,81,24,0)' // 100% 处的颜色
									    }]
					            	}
			            		}
			            	}
			            },
			            barWidth:16
			        },
			        {
			        	name:"趋势",
			        	type:"line",
			        	data:lineData,
			        	label:{
			        		normal:{
			        			show:true,
			        			textStyle:{
			        				color:"white",
			        				fontSize:16
			        			},
			        			formatter:function (d) {
			        				var a = [1.54,1.04,1.54,1.34,1.56,2.16,0.87,0.67,1.07];

			        				var per = a[lineData.indexOf(d.value)];

			        				return per + "%"
			        			}
			        		}
			        	},
			        	itemStyle:{
			        		normal:{
			        			color:"white"
			        		}
			        	}
			        }
			    ]
			}
			var chart = echarts.init($("#qy_bar").get(0));
			chart.setOption(option);
		}
		function chart_5() {
			var option = {
			    tooltip: {
			        trigger: 'item',
			        formatter: "{a} <br/>{b}: {c} ({d}%)"
			    },
			    legend: {
			       	show:false
			    },
			    color:["#50fba1","#ffa800","#42d6e5"],
			    series: [
			        {
			            name:'规模以上工业',
			            type:'pie',
			            radius: ['30%', '70%'],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: true,
			                    position: 'outside',
			                    textStyle:{
			                    	color:"white",
			                    	fontSize:16
			                    },
			                    formatter:function (d) {
			                    	return "#"+JSON.stringify(d)+"#"
 			                    }
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: true,
			                    lineStyle:{
			                    	color:"white"
			                    }
			                }
			            },
			            data:[
			                {value:12, name:'集体企业'},
			                {value:12.8, name:'国有企业'},
			                {value:24.8, name:'股份制企业'},
			            ]
			        }
			    ]
			};

			var chart = echarts.init($("#gmgy").get(0));
			chart.setOption(option);

			formatterText();

			function formatterText(){

				var zr = chart.getZr();

				var list = zr.storage.getDisplayList();

				var shape,d,x,y;

				var increase = [-7.3,-1.7, 13.5];

				for(var i = 0 ; i < list.length ; i ++){

					shape = list[i];

					if(shape.style.text && shape.style.text.indexOf("#") != -1){

						x = shape.style.x , y = shape.style.y;

						d = JSON.parse(shape.style.text.replace(/\#/g,""));

						option.series[d.seriesIndex].label.normal.formatter = function(d) {
							return d.value + "亿元"  + "\n" + d.name
						}

						var left = shape.style.textAlign == "left" ? true : false;

						var text1 = new echarts.graphic.Text({
					        style: {
					            text: increase[d.dataIndex] < 0 ? "下降" : "增长",
					            x: left ? x : (x - (16 + 16 + 16)),
					            y: y + 16 + 16,
					            textFont: 'normal 16px Microsoft YaHei',
					            fill:"#9c9c9c",
					            lineWidth:0,
					            textAlign:shape.style.textAlign

					        },
					        hoverable:false
				    	});

				    	var p  = new echarts.graphic.Image({
		                    style: {
		                        image: increase[d.dataIndex] < 0 ? "./imgs/down.png" : "./imgs/up.png",
		                        x: x + (left ? 16 + 16 + 2 : -45) ,
		                        y: y + 16 + 5,
		                        width: 11,
		                        height: 10
		                    }
		                });
				    	
				    	var text2 = new echarts.graphic.Text({
					        style: {
					            text: Math.abs(increase[d.dataIndex]),
					            x: !left ? x : (x + (16 + 16 + 16)),
					            y: y + 16 + 16,
					            textFont: 'normal 16px Microsoft YaHei',
					            fill:"#9c9c9c",
					            lineWidth:0,
					            textAlign:shape.style.textAlign
					        },
					        hoverable:false
				    	});

						zr.add(text1);
						zr.add(text2);
						zr.add(p);
					}
				}

				chart.setOption(option,true);

			}

		}
		function chart_6() {
			var option = {
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    color:["#00fff6","#2ef9a7","#fefefe","#f58800"],
			    legend: {
			        data:['地区生产总值','固定资产投资','公共预算收入','大口径财政收入'],
			        textStyle:{
			        	color:"white",
			        	fontSize:16
			        },
			        itemHeight:5,
			        right:0,
			        top:10
			    },
			    grid: {
			        left: '0%',
			        right: '0%',
			        bottom: '0%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : ['2012','2013','2014','2015','2016','2017'],
			            splitLine:{
			            	show:false
			            },
			            axisTick:{
			            	show:false
			            },
			            axisLabel:{
			            	interval:0,
			            	textStyle:{
			            		color:"white",
			            		fontSize:16
			            	}
			            },
			            axisLine:{
			            	show:false
			            }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            splitLine:{
			            	show:false
			            },
			            axisTick:{
			            	show:false
			            },
			            axisLabel:{
			            	show:false
			            },
			            axisLine:{
			            	show:false
			            }
			        }
			    ],
			    series : [
			        {
			        	name:"地区生产总值",
			        	type:"line",
			        	data:[20-4,22-4,23-4,26-4,30-4,40-4],
			        	label:{
			        		normal:{
			        			show:true,
			        			textStyle:{
			        				color:"white",
			        				fontSize:16
			        			}
			        		}
			        	}
			        },
			        {
			        	name:"固定资产投资",
			        	type:"line",
			        	data:[20,22,23,26,30,40],
			        	label:{
			        		normal:{
			        			show:true,
			        			textStyle:{
			        				color:"white",
			        				fontSize:16
			        			}
			        		}
			        	}
			        },
			        {
			        	name:"公共预算收入",
			        	type:"line",
			        	data:[20+5,22+5,23+5,26+5,30+5,40+5],
			        	label:{
			        		normal:{
			        			show:true,
			        			textStyle:{
			        				color:"white",
			        				fontSize:16
			        			}
			        		}
			        	}
			        },
			        {
			        	name:"大口径财政收入",
			        	type:"line",
			        	data:[20-10,22-10,23-10,26-10,30-10,40-10],
			        	label:{
			        		normal:{
			        			show:true,
			        			textStyle:{
			        				color:"white",
			        				fontSize:16
			        			}
			        		}
			        	}
			        }
			    ]
			}

			var chart = echarts.init($("#jjfzqs").get(0));
			chart.setOption(option);
		}

	});

	function chart_7() {

		var lineData = [36.9 + 50,42.8 + 50,60.4 + 50];
		var option = {
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		        data:['新增企业','新增规上工业企业','新培育小微企业'],
		        show:false
		    },
		    grid: {
		        left: '0%',
		        right: '0%',
		        bottom: '12%',
		        containLabel: false
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : ['2016上半年','2016下半年','2017上半年'],
		            splitLine:{
		            	show:false
		            },
		            axisTick:{
		            	show:false
		            },
		            axisLabel:{
		            	interval:0,
		            	textStyle:{
		            		color:"white",
		            		fontSize:16
		            	}
		            },
		            axisLine:{
		            	show:false
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            splitLine:{
		            	show:false
		            },
		            axisTick:{
		            	show:false
		            },
		            axisLabel:{
		            	show:false
		            },
		            axisLine:{
		            	show:false
		            }
		        }
		    ],
		    series : [
		        {
		            name:'特色农业总产值',
		            type:'bar',
		            data:[36.9,42.8,60.4],
		            label:{
		            	normal:{
		            		show:true,
		            		position:"top",
		            		textStyle:{
		            			color:"white",
		            			fontSize:16
		            		},
		            		formatter:function (d) {
			            		return d.value + "亿元"
			            	}
		            	}
		            	
		            },
		            itemStyle:{
		            	normal:{
		            		borderColor:"#277d5d",
		            		borderWidth:1,
		            		color:function (a,b) {
		            			return {
								    type: 'linear',
								    x: 0,
								    y: 1,
								    x2: 0,
								    y2: 0,
								    colorStops: [{
								        offset: 0, color: 'rgba(39,125,93,1)' // 0% 处的颜色
								    },{
								        offset: 1, color: 'rgba(39,125,93,0)' // 100% 处的颜色
								    }]
				            	}
		            		}
		            	}
		            },
		            barWidth:25
		        },
		        {
		        	name:"趋势",
		        	type:"line",
		        	data:lineData,
		        	label:{
		        		normal:{
		        			show:true,
		        			textStyle:{
		        				color:"white",
		        				fontSize:16
		        			},
		        			formatter:function (d) {
		        				var a = [1.54,1.04,1.54,1.34,1.56,2.16,0.87,0.67,1.07];

		        				var per = a[lineData.indexOf(d.value)];

		        				return per + "%"
		        			}
		        		}
		        	},
		        	itemStyle:{
		        		normal:{
		        			color:"#3ed8a1"
		        		}
		        	}
		        }
		    ]
		}
		var chart = echarts.init($("#right-reportForm-1 .report").get(0));
		chart.setOption(option);
	}
	function chart_8() {

		var data = [
			{name:"核桃",value:52.5},
			{name:"花椒",value:46.25},
			{name:"土蜜蜂",value:46.25},
			{name:"油橄榄",value:31.25},
			{name:"木耳",value:52.5},
			{name:"中药材",value:31.25}
		];

		var styles = [
			{color:"#ff8a00",x: 50,y: 50,r: 46 * 2,height:130},
			{color:"#40dfac",x: 50 + 108,y: 50 + 26,r: 36 * 2,height: 104},
			{color:"#40dfac",x: 50 + 108 + 171,y: 50 + 26,r: 36 * 2,height: 104},
			{color:"#71e3ea",x: 50 + 58,y: 50 + 60,r: 29 * 2,height: 84},
			{color:"#ff8a00",x: 50 + 176,y: 50 + 14,r: 46 * 2,height:130},
			{color:"#71e3ea",x: 50 + 233,y: 50 + 73,r: 29 * 2,height:84}
		];

		var zr = zrender.init(document.getElementById("report2"));

		for(var i = 0 ; i < data.length ; i ++){
			createCharts$2({
				zr:zr,
				x:styles[i].x,
				y:styles[i].y,
				r:styles[i].r,
				height:styles[i].height,
				color:styles[i].color,
				labelX:data[i].name,
				labelY:data[i].value + "万亩"
			});
		}
		
	}
	function chart_9() {
		var option = {

		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c}万亩"
		    },
		    legend: {
		        show:false,
		        data: ['红芪','纹党','当归','大黄','刺五加','天麻','黄连','半夏','柴胡','杜仲','贝母','山茱萸']
		    },
		    color:["#c2f6ff","#81edff","#3fd9f3","#11bbd8","#06b1ab","#149f83","#13866f","#0d7963","#096855","#065c4b","#035142",'#ecfcff'],
		    series : [
		        {
		            name: '特色农产品',
		            type: 'pie',
		            radius : '60%',
		            center: ['50%', '50%'],
		            label:{
		            	normal:{
		            		textStyle:{
		            			color:"white",
		            			fontSize:16
		            		},
		            		formatter:function (d) {
		            			return d.name + d.value + "万斤"
		            		}
		            	}
		            },
		            data:[
		                {value:150, name:'红芪'},
		                {value:150, name:'纹党'},
		                {value:150, name:'当归'},
		                {value:150, name:'大黄'},
		                {value:150, name:'刺五加'},
		                {value:150, name:'天麻'},
		                {value:150, name:'黄连'},
		                {value:150, name:'半夏'},
		                {value:150, name:'柴胡'},
		                {value:150, name:'杜仲'},
		                {value:150, name:'贝母'},
		                {value:150, name:'山茱萸'}
		            ],
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};
		var chart = echarts.init($("#right-reportForm-2 #report3").get(0));
		chart.setOption(option);
	}
	function chart_10() {
		var option = {
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    color:["#42d6e5","#50fba1"],
		    legend: {
		        show:false
		    },
		    grid: {
		        left: '0%',
		        right: '0%',
		        bottom: '15%',
		        containLabel: false
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : ['油料','蔬菜','粮食','特色产业'],
		            splitLine:{
		            	show:false
		            },
		            axisTick:{
		            	show:false
		            },
		            axisLabel:{
		            	interval:0,
		            	textStyle:{
		            		color:"white",
		            		fontSize:16
		            	}
		            },
		            axisLine:{
		            	show:false
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            splitLine:{
		            	show:false
		            },
		            axisTick:{
		            	show:false
		            },
		            axisLabel:{
		            	show:false
		            },
		            axisLine:{
		            	show:false
		            },
		            max:120
		        }
		    ],
		    series : [
		        {
		            name:'产量',
		            type:'bar',
		            data:[34.67,56.97,111.5,111.5],
		            label:{
		            	normal:{
		            		show:true,
		            		position:"top",
		            		textStyle:{
		            			color:"white",
		            			fontSize:16
		            		},
		            		formatter:function (d) {
		            			return d.value + "万亩"
		            		}
		            	}
		            },
		            itemStyle:{
		            	normal:{
		            		borderColor:"#237282",
		            		borderWidth:1,
		            		color:function (a,b) {
		            			return {
								    type: 'linear',
								    x: 0,
								    y: 1,
								    x2: 0,
								    y2: 0,
								    colorStops: [{
								        offset: 0, color: 'rgba(38,123,138,1)' // 0% 处的颜色
								    },{
								        offset: 1, color: 'rgba(38,123,138,0)' // 100% 处的颜色
								    }]
				            	}
		            		}
		            	}
		            },
		            barWidth:34
		        },
		        {
		            name:'增速',
		            type:'bar',
		            data:[{i:"1.39%",value:10},{i:"2.26%",value:20},{i:"5.17%",value:80},{i:"5.17%",value:80}],
		            label:{
		            	normal:{
		            		show:true,
		            		position:"top",
		            		textStyle:{
		            			color:"white",
		            			fontSize:16
		            		},
		            		formatter:function (d) {
		            			return d.data.i
		            		}
		            	}
		            },
		            itemStyle:{
		            	normal:{
		            		borderColor:"#277d5d",
		            		borderWidth:1,
		            		color:function (a,b) {
		            			return {
								    type: 'linear',
								    x: 0,
								    y: 1,
								    x2: 0,
								    y2: 0,
								    colorStops: [{
								        offset: 0, color: 'rgba(39,125,93,1)' // 0% 处的颜色
								    },{
								        offset: 1, color: 'rgba(39,125,93,0)' // 100% 处的颜色
								    }]
				            	}
		            		}
		            	}
		            },
		            barWidth:34
		        }
		    ]
		}
		var chart = echarts.init($("#right-reportForm-2 .report-1").get(0));
		chart.setOption(option);
	}
	function chart_11() {
		var option = {
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    color:["#00fff6","#2ef9a7","#fefefe","#f58800"],
		    legend: {
		        data:['城镇居民可支配收入','农民人均纯收入'],
		        textStyle:{
		        	color:"white",
		        	fontSize:16
		        },
		        itemHeight:5,
		        right:0,
		        top:10
		    },
		    grid: {
		        left: '0%',
		        right: '0%',
		        bottom: '15%',
		        containLabel: false
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : ['2012','2013','2014','2015','2016'],
		            splitLine:{
		            	show:false
		            },
		            axisTick:{
		            	show:false
		            },
		            axisLabel:{
		            	interval:0,
		            	textStyle:{
		            		color:"white",
		            		fontSize:16
		            	}
		            },
		            axisLine:{
		            	show:false
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            splitLine:{
		            	show:false
		            },
		            axisTick:{
		            	show:false
		            },
		            axisLabel:{
		            	show:false
		            },
		            axisLine:{
		            	show:false
		            }
		        }
		    ],
		    series : [
		        {
		        	name:"城镇居民可支配收入",
		        	type:"line",
		        	data:[20-4,22-4,23-4,26-4,30-4,40-4],
		        	label:{
		        		normal:{
		        			show:false,
		        			textStyle:{
		        				color:"white",
		        				fontSize:16
		        			}
		        		},
		        		emphasis:{
		        			show:true,
		        			textStyle:{
		        				color:"white",
		        				fontSize:16
		        			}
		        		}
		        	}
		        },
		        {
		        	name:"农民人均纯收入",
		        	type:"line",
		        	data:[20,22,23,26,30,40],
		        	label:{
		        		normal:{
		        			show:false,
		        			textStyle:{
		        				color:"white",
		        				fontSize:16
		        			}
		        		},
		        		emphasis:{
		        			show:true,
		        			textStyle:{
		        				color:"white",
		        				fontSize:16
		        			}
		        		}
		        	}
		        }
		    ]
		}

		var chart = echarts.init($("#right-reportForm-4 .report").get(0));
		chart.setOption(option);
	}
	function chart_12() {
		var option = {
			animationDuration: 2000,
		    title: {
		    	show:true,
		        text: '单位：万元',
		        textStyle:{
		        	color:"white",
		        	fontSize:16
		        },
		        left:"4%",
	        	top:"5%"
		    },
		    color:["#00fff6","#2ef9a7"],
		    tooltip : {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'cross',
		            label: {
		                backgroundColor: '#6a7985'
		            }
		        }
		    },
		    legend: {
		        data:['地区平均','全省平均'],
		        right:'0%',
		        top:'5%',
		        itemHeight:2,
		        itemWidth:14,
		        textStyle:{
		        	color:"white",
		        	fontSize:16
		        },
		        data:[
		        	{
		        		name:"地区平均",
		        		icon:"rect"
		        	},
		        	{
		        		name:"全省平均",
		        		icon:"rect"
		        	}
		        ]
		    },
		    grid: {
		        left: '5%',
		        right: '5%',
		        bottom: '15%',
		        containLabel: false
		    },
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : ['2016-09','2016-10','2016-11','2016-12','2017-01','2017-02','2017-03'],
		            splitLine:{  
                　　　　show:false  
                　　},
                	axisLabel:{
                		textStyle:{
                			color:"white",
                			fontSize:16
                		}
                	},
                	axisTick:{
		            	show:false
		            },
		            axisLine:{
		            	show:false
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            splitLine:{
		            	show:false
		            },
		            axisTick:{
		            	show:false
		            },
		            axisLabel:{
		            	show:false
		            },
		            axisLine:{
		            	show:false
		            }
		        }
		    ],
		    series : [
		        {
		            name:'地区平均',
		            type:'line',
		            lineStyle:{
		            	normal:{
		            		color:"#00fff6"
		            	}
		            },
		            label:{
		            	normal:{
		            		show:true,
		            		textStyle:{
		            			color:"white",
		            			fontSize:16
		            		}
		            	}
		            },
		            areaStyle: {normal: {
		            	color:{
						    type: 'linear',
						    x: 1,
						    y: 0,
						    x2: 1,
						    y2: 1,
						    colorStops: [{
						        offset: 0, color: 'rgba(0,255,246, 1)' // 0% 处的颜色
						    }, {
						        offset: 0.8, color: 'rgba(0,255,246, 0)' // 100% 处的颜色
						    }],
						    globalCoord: false // 缺省为 false
						}
		            }},
		            data:[60.13, 75.51, 80.42, 95.12, 95.2, 115.2]
		        },
		        {
		            name:'全省平均',
		            type:'line',
		            lineStyle:{
		            	normal:{
		            		color:"#49d087"
		            	}
		            },
		            label:{
		            	normal:{
		            		show:true,
		            		textStyle:{
		            			color:"white",
		            			fontSize:16
		            		}
		            	}
		            },
		            areaStyle: {normal: {
		            	color:{
						    type: 'linear',
						    x: 1,
						    y: 0,
						    x2: 1,
						    y2: 1,
						    colorStops: [{
						        offset: 0, color: 'rgba(46,249,167, 1)' // 0% 处的颜色
						    }, {
						        offset: 0.8, color: 'rgba(46,249,167, 0)' // 100% 处的颜色
						    }],
						    globalCoord: false // 缺省为 false
						}
		            }},
		            data:[102.01, 95.51, 120.42, 101.42, 98.23, 150.23]
		        }
		    ]
		};

		var chart = echarts.init($("#right-reportForm-5 .report").get(0));
		chart.setOption(option);
	}

	function chart_13() {
		var zr = zrender.init(document.getElementById("productsAreaReport"));
		var len = 6;
		var i = 0;

		var increase = [0,20,40,60,80,100];

		d3.interval(function () {
			zr.clear();
			$(".mid-top .year-line li").removeClass("selected").eq(i).addClass("selected");
			histogram3D({
				data:[{name:"产值",value:248+increase[i],color:"#288491",textColor:"#ffffff"},
					  {name:"产量",value:48+increase[i],color:"#e5800c",textColor:"#ffffff"}],
				title:"中药材",
				textColor:"#ffffff",
				x:100,
				y:100,
				zr:zr
			});
			histogram3D({
				data:[{name:"产值",value:248+increase[i],color:"#288491",textColor:"#ffffff"},
					  {name:"产量",value:48+increase[i],color:"#e5800c",textColor:"#ffffff"}],
				title:"苹果",
				textColor:"#ffffff",
				x:250,
				y:280,
				zr:zr
			});
			histogram3D({
				data:[{name:"产值",value:248+increase[i],color:"#288491",textColor:"#ffffff"},
					  {name:"产量",value:48+increase[i],color:"#e5800c",textColor:"#ffffff"}],
				title:"花椒",
				textColor:"#ffffff",
				x:200,
				y:500,
				zr:zr
			});
			histogram3D({
				data:[{name:"产值",value:248+increase[i],color:"#288491",textColor:"#ffffff"},
					  {name:"产量",value:48+increase[i],color:"#e5800c",textColor:"#ffffff"}],
				title:"核桃",
				textColor:"#ffffff",
				x:1020,
				y:200,
				zr:zr
			});
			histogram3D({
				data:[{name:"产值",value:248+increase[i],color:"#288491",textColor:"#ffffff"},
					  {name:"产量",value:48+increase[i],color:"#e5800c",textColor:"#ffffff"}],
				title:"茶叶",
				textColor:"#ffffff",
				x:830,
				y:410,
				zr:zr
			});
			histogram3D({
				data:[{name:"产值",value:248+increase[i],color:"#288491",textColor:"#ffffff"},
					  {name:"产量",value:48+increase[i],color:"#e5800c",textColor:"#ffffff"}],
				title:"油橄榄",
				textColor:"#ffffff",
				x:750,
				y:610,
				zr:zr
			});
			zr.render();

			i++;
			if(i >= len){
				i = 0;
			}
		
		},5000,0);
		
	}

	//立体柱状图表
	function histogram3D(options){

		var zr = options.zr;

		var data  = options.data || [];

		var title = options.title || "";

		var i = 0 ; len = data.length;

		var height = d3.scaleLinear().domain([0,250]).range([0,60])

		var width = 15 , x = options.x || 0 , y = options.y || 0 ;

		var maxHeight = height(d3.max(data,function(d) {
			return d.value
		}));

		var unit = ["万元","万斤"];

		while(i < len){
			createCharts$1({
				x: x + (i*40),
				y:y + 58,
				width:width,
				height:height(data[i].value),
				color:data[i].color,
				labelX:data[i].name,
				labelY:data[i].value + unit[i],
				textColor:data[i].textColor,
				zr:zr
			});
			i++;
		}
		zr.addShape(new Text({
	        style: {
	            text: options.title || "",
	            x: x + width*len/2 + 16,
	            y: y + 32 + 5 + 58,
	            brushType : 'fill',
		        color : options.textColor,
		        lineWidth : 3,
		        textFont : 'bold 20px verdana',
		        textAlign : 'center',
	        },
	        hoverable:false
	    }))
	}

	//立体柱状图型
	function createCharts$1(styles) {

		styles  = styles || {};

		var zr = styles.zr;

		var x = styles.x || 0 , y = styles.y || 0 ;

		var width = styles.width || 15, height = styles.height || 58 ,color = styles.color || "black"; 

		var g = new Group();

		var color = d3.scaleLinear().domain([0,1]).range(["#ffffff",color]).interpolate(d3.interpolateHsl);

		var deg30 = Math.PI / 6;

		var zY = width/2 * Math.sin(deg30);
		var zX = width/2 * Math.cos(deg30);

		var poly1 = new Polygon({
			style:{
				pointList:[[x,y],[x+width,y],[x+width,y-height],[x,y-height]],
				color:color(1),
			},
	        hoverable:false
		});
	    var poly2 = new Polygon({
			style:{
				pointList:[ [x + width, y ], [x + width + zX ,y - zY], [ x + width + zX ,y - height - zY],[x+width,y - height]],
				color:color(0.5)
			},
	        hoverable:false
		});
	    var poly3 = new Polygon({
			style:{
				pointList:[[x , y-height ],[x + zX , y - zY - height],[x + width + zX, y - zY - height],[x + width,y-height]],
				color:color(1.1)
			},
	        hoverable:false
		});

		var textX = new Text({
	        style: {
	            text: styles.labelX || "",
	            x: x + width/2,
	            y: y + 16,
	            textAlign:"center",
	            textFont: '16px Arial',
	            color:styles.textColor
	        },
	        hoverable:false
	    });

	    var textY = new Text({
	        style: {
	            text: styles.labelY || "",
	            x: x + width/2,
	            y: y - 16 - height,
	            textAlign:"center",
	            textFont: '16px Arial',
	            color:styles.textColor
	        },
	        hoverable:false
	    });

	    var dh = 0;
	   /* var t = d3.timer(function () {

	    	dh += 1;
	    	if(dh > height) {
	    		t.stop();
	    	}
	    	zr.modShape(poly1.id,{
	    	 	style:{
					pointList:[[x,y + height - dh],[x+width,y + height - dh],[x+width,y+height],[x,y+height]]
				}
	    	});
	    	zr.modShape(poly2.id,{
	    	 	style:{
					pointList:[ [x + width, y + height - dh ], [x + width + zX ,y - zY + height - dh], [ x + width + zX ,y + height - zY],[x+width,y+height]]
				}
	    	});
	    	zr.modShape(poly3.id,{
	    	 	style:{
					pointList:[[x , y + height - dh ],[x + zX , y + height - dh  - zY],[x + width + zX, y + height - dh  - zY],[x + width,y + height - dh ]]
				}
	    	});

	    	zr.modShape(textY.id,{
	    	 	style:{
					y: y + height - dh  - 16,
				}
	    	});

	    	zr.refresh();

	    });*/

		g.addChild(poly1);
		g.addChild(poly2);
		g.addChild(poly3);
		g.addChild(textX);
		g.addChild(textY);
		zr.addShape(g);

	}

	//嵌套饼图
	function nestedPieGraph(options){

		if(!options.dom)return;

		var zr = zrender.init(document.getElementById(options.dom));

		options = options || {};

		options.styles = options.styles || {};

		var dr = options.styles.dr || 20, // 每个圆半径大小 
		    x = options.styles.x || 0, 
		    y = options.styles.y || 0, 
		    ir = options.styles.ir || 50; // 空心圆半径

		var g = new Group();

		var data = options.data || [];

		var rDr0 = [0],
			r,  //外圈半径
		    r0, //内圈半径;
		    sa, //开始角
		    ea,
		    getValue; //结束角

	    var maxValue = d3.max(data,function(d){return d.value});
		var getValue = d3.scaleLinear().range([90,270 + 45]).domain([0,maxValue]);

		var shapes = [];

		for(var i = 0 ; i < data.length ; i ++){

			r0 = ir + dr * (i) + 3 * i;
			r  = ir + dr * (i+1) + 3 * i;

			r0 += (i > 0 ? rDr0[i-1] : 0);
			r  += (i > 0 ? rDr0[i] + rDr0[i-1]: 0);

			rDr0.push( (r-r0)/3 );

			shapes.push(new Sector({
			    style : {
			        x : x,
			        y : y,
			        r0 : r0,
			        r :  r,
			        startAngle : 90,
        			endAngle : getValue(data[i].value),
			        brushType : 'fill',
			        color : data[i].color || "black",
			    },
			    hoverable:false
			}))
			shapes.push(new Text({
		        style: {
		            text: data[i].name,
		            x: x + 10,
		            y: y - ( r - ( r - r0 )/2),
		            textFont: 'bold 16px Arial',
		            color:data[i].textColor
		        },
		        hoverable:false
		    }));

		};

	  	var len = shapes.length;
	  	var ans = {};
	  	while(len -- ){
	  		zr.addShape(shapes[len]);
	  		if(len % 2 == 0){
	  			ans[shapes[len].id] = d3.scaleLinear().domain([0,1]).range([90,shapes[len].style.endAngle]);
	  		}
	  	}

  		d3.transition()
	  	    .duration(options.styles.animation || 1000)
	  	    .tween(null,function () {
	  	  	    return function (t) {
	  	  	  	    len = shapes.length;
		  	  	  	while(len -- ){
		  	  	  		if(len % 2 == 0){
		  	  	  			zr.modShape(shapes[len].id,{
		  	  	  				style:{
		  	  	  					endAngle:ans[shapes[len].id](t)
		  	  	  				}
				  			});
		  	  	  		}
				  	}
			  	    zr.refresh();
	  	  	    }
	  	    });

	    zr.render();

	}

	//锥形图形
	function createCharts$2(styles){

		/*if(!options.dom)return;

		var zr = zrender.init(document.getElementById(options.dom));*/

		var zr = styles.zr;

		styles  = styles || {};

		var x = styles.x || 0 , y = styles.y || 0 ;

		var r = styles.r || 100, height = styles.height || 100 ,color = styles.color || "black"; 

		var g = new Group();

		var color = d3.scaleLinear().domain([0,1]).range(["#ffffff",color]).interpolate(d3.interpolateHsl);

		var path1 = d3.path();
		path1.moveTo(x,y);
		path1.lineTo(x,y+height);
		path1.lineTo(x - r/2,y + height);
		path1.quadraticCurveTo(x - r / 4 + 10 , y + height / 2 + 10, x, y);

		var shape1 = new Path({
			style:{
				path:path1.toString(),
				color:color(1.1)
			},
	        hoverable:false
		});

		var path2 = d3.path();
		path2.moveTo(x,y);
		path2.lineTo(x,y+height);
		path2.lineTo(x + r/2,y + height);
		path2.quadraticCurveTo(x + r / 4 - 8 , y + height / 2 + 8, x, y);
		
		var shape2 = new Path({
			style:{
				path:path2.toString(),
				color:color(1)
			},
	        hoverable:false
		});

		var textX = new Text({
	        style: {
	            text: styles.labelX || "",
	            x: x,
	            y: y + height + 16,
	            textAlign:"center",
	            textFont: '16px Microsoft YaHei',
	            color:"#ffffff"

	        },
	        hoverable:false
	    });

	    var textY = new Text({
	        style: {
	            text: styles.labelY || "",
	            x: x,
	            y: y - 16,
	            textAlign:"center",
	            textFont: '16px Microsoft YaHei',
	            color:"#ffffff"
	        },
	        hoverable:false
	    });


	    var dh = 0;

	    var delta = d3.scaleLinear().domain([0,height]).range([0,8]);

	    var t = d3.timer(function () {

	    	dh += 2;

	    	if(dh > height) {
	    		t.stop();
	    	}
	    	//var delta = dh / 2 > 8 ? 8 : 0;
	    	var path1 = d3.path();
			path1.moveTo(x,y + height - dh);
			path1.lineTo(x,y + height);
			path1.lineTo(x - r/2,y + height);
			path1.quadraticCurveTo(x - r / 4 + 10 , y + height - dh/ 2 + delta(dh), x, y + height - dh);
	    	
	    	var path2 = d3.path();
			path2.moveTo(x, y + height - dh);
			path2.lineTo(x, y+height);
			path2.lineTo(x + r/2,y + height);
			path2.quadraticCurveTo(x + r / 4 - 8 , y + height - dh / 2 + delta(dh), x, y + height - dh);

			if(shape1.style && shape1.style.pathArray){
				shape1.style.pathArray = null;
			}
			if(shape2.style && shape2.style.pathArray){
				shape2.style.pathArray = null;
			}

			zr.modShape(shape1.id,{
	    	 	style:{
					path:path1.toString()
				}
	    	});
	    	zr.modShape(shape2.id,{
	    	 	style:{
					path:path2.toString()
				}
	    	});

	    	zr.modShape(textY.id,{
	    	 	style:{
					y: y + height - dh  - 16,
				}
	    	});

	    	zr.refresh();

	    });

		g.addChild(shape1);
		g.addChild(shape2);
		g.addChild(textX);
		g.addChild(textY);
		zr.addShape(g);

	}

});

/*d3.selectAll("#jz .p .report-growth")
.append("svg")
.attr("viewBox","0 0 1024 1024")
.attr("width",18)
.attr("height",18)
.append("path")
.attr("d","M761.719 992.393h-513.741l9.933-498.483-222.703-1.314 469.299-466.671 473.975 476.604-221.406 2.645z")
.attr("fill","#72ffbb");*/

