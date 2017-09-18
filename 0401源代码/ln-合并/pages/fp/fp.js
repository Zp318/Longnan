$(function () {

		$.when($.get("../../json/621200.json"),$.get("../../json/poor.json"))
		.done(function(longnan,poor){
			echarts.registerMap("陇南0",(typeof longnan[0] == "string" ? $.parseJSON(longnan[0]):longnan[0]));
			echarts.registerMap("陇南1",(typeof longnan[0] == "string" ? $.parseJSON(longnan[0]):longnan[0]));
			echarts.registerMap("陇南2",(typeof longnan[0] == "string" ? $.parseJSON(longnan[0]):longnan[0]));
			echarts.registerMap("陇南贫困区域",(typeof poor[0] == "string" ? $.parseJSON(poor[0]):poor[0]));
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
			                show: true,
			                textStyle:{
			                	color:"white"
			                }
			            },
		                emphasis:{
			            	textStyle:{
			                	color:"white"
			                }
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
			                show: true,
			                textStyle:{
			                	color:"white"
			                }
			            },
		                emphasis:{
			            	textStyle:{
			                	color:"white"
			                }
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
			                show: true,
			                textStyle:{
			                	color:"white"
			                }
			            },
		                emphasis:{
			            	textStyle:{
			                	color:"white"
			                }
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

			var chart = echarts.init($("#baseMap").get(0));
			chart.setOption(mapOption);

			

			var poor = (function(){

				var animateIndex = 15;
				return {
					render:function(){
						this.mapOption = $.extend(true,{},mapOption);
						var chart = echarts.init($("#baseMap").get(0));
						chart.setOption(this.mapOption);
						this.chart = chart;
						var mapJson = this.mapJson =  echarts.getMap("陇南贫困区域");
						var uuid = this.id = "map_" + new Date().getTime();
						var html = "<div id='"+uuid+"'  style='width:100%;height:100%;position:absolute;left:0;top:0'></div>"
						var dom = "#poorArea";
						$(dom).append(html);

						var _this = this;
						require(["zrender",'zrender/shape/Polygon'],function (zrender,Polygon) {
							var zr = zrender.init(document.getElementById(uuid));

							_this.zr = zr;
							_this.Polygon = Polygon;
							_this.draw(mapJson);

							zr.render();
						})



						/*var context = $("#"+uuid+" canvas").get(0).getContext("2d");
						this.context = context;
						this.addInfoPanel();
						this.draw(mapJson);*/
						//this.animate();
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
									this.drawGraph(j,coordinate,i == animateIndex ? true : false);
									j++;
								}

								/*if(i == animateIndex){
									_this.showInfo(feature.properties);
								}*/
								i ++;
							}
						}
					},
					addInfoPanel:function(){
						var p = this.infoPanel = $("<div></div>")
						.css({
							position:"absolute",
							top:140,
							right:-(420),
							width:350,
							height:302,
							background: "url(../../img/ccs.png) no-repeat",
	    					backgroundPosition: "-110px -94px"
						});

						p.append($("<div class='areaName'>某某某贫困片区</div>").css({
							width:"100%",
							height:38,
							color:"#73ffb6",
							fontSize:20+"px",
							lineHeight:38+"px",
							textIndent:20+"px",
							textShadow:"0px 0px 5px white",
						}))

						var report = $("<div class='report'></div>").css({
							height:248,
							width:"100%",
							marginTop:"10px",
							position:"relative"
						})
						report.append("<div style='width:100%;height:90px;'>"+
							"<div style='width:50%;height:100%;float:left;'>"+
								"<div style='color:white;font-size:14px;margin-left:25px;margin-top:20px;'>贫困村数量</div>"+
								"<div style='color:white;font-size:14px;margin-left:25px;margin-top:5px;'><span  style='font-size:24px;' class='green pkc' >28</span>个</div>"+
							"</div>"+
							"<div style='width:50%;height:100%;float:left;'>"+
								"<div style='color:white;font-size:14px;margin-left:25px;margin-top:20px;'>贫困率</div>"+
								"<div style='color:white;font-size:14px;margin-left:25px;margin-top:5px;'><span  style='font-size:24px;' class='green pkl' >2.5%</div>"+
							"</div>"+
							"</div>");

						report.append("<div class='pkh' style='width:100%;height:155px'></div>");

						p.append(report);

						$("#"+this.id).append(p);

						var chart = this.areaPoorChart = echarts.init(report.find(".pkh").get(0));
						var option = this.areaPoorChartOption = {
						    title: {
						    	show:false
						    },
						    color:["#49d087"],
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
						        data:['贫困户数量'],
						        textStyle:{
						        	color:'white'
						        },
						        itemHeight:12,
						        right:"10%"
						    },
						    grid: {
						        left: '5%',
						        right: '12%',
						        bottom: '9%',
						        top:'14%',
						        containLabel: true,
						        show:false
						    },
						    xAxis : [
						        {
						            type : 'category',
						            boundaryGap : false,
						            data : ['2014','2015','2016','2017'],
						            splitLine:{  
				                　　　　show:false  
				                　　},
				                	axisLine:{
				                		show:true,
				                		lineStyle:{
				                			color:"#314d59"
				                		}
				                	},
			                		axisTick:{
			                			show:false
			                		},
				                	axisLabel:{
				                		textStyle:{
				                			color:"white",
				                			fontSize:14
				                		}
				                	}
						        }
						    ],
						    yAxis : [
						        {
						            type : 'value',
						            splitLine:{  
				                　　　　show:false  
				                　　},
				                	axisLine:{
				                		show:true,
				                		lineStyle:{
				                			color:"#314d59"
				                		}
				                	},
			                		axisTick:{
			                			show:false
			                		},
				                	axisLabel:{
				                		textStyle:{
				                			color:"white",
				                			fontSize:14
				                		},
				                		formatter:function(d){
				                			return d > 0 ? d + ".00" :d  
				                		}
				                	}
						        }
						    ],
						    series : [
						        {
						            name:'贫困户数量',
						            type:'line',
						            stack: '总量',
						            areaStyle: {normal: {
						            	color:{
										    type: 'linear',
										    x: 1,
										    y: 0,
										    x2: 1,
										    y2: 1,
										    colorStops: [{
										        offset: 0, color: 'rgba(73,208,135, 1)' // 0% 处的颜色
										    }, {
										        offset: 1, color: 'rgba(73,208,135, 0)' // 100% 处的颜色
										    }],
										    globalCoord: false // 缺省为 false
										}
						            }},
						            data:[15, 13, 8, 6]
						        }
						    ]
						}
						chart.setOption(option);
					},

					showInfo:function(properties){
						this.infoPanel.find(".areaName").html(properties.a + "贫困片区");
						this.infoPanel.find(".pkc").html(properties.b);
						this.infoPanel.find(".pkl").html(properties.c+"%");
						this.areaPoorChartOption.series[0].data = properties.d;
						this.areaPoorChart.setOption(this.areaPoorChartOption);
					},
					drawGraph:function(i,coordinates,select){
						var zr = this.zr , Polygon = this.Polygon;
						var i = 0 ,len = coordinates.length,coordinate;

						/*if(select){
							ctx.fillStyle   = "#fef600";
							ctx.strokeStyle = "#fef600";
							ctx.shadowColor = "#fef600";
							ctx.shadowBlur  = 20;
						}else{
							ctx.fillStyle = "#f5255f";
							ctx.strokeStyle = "#f5255f";
							ctx.shadowColor = "";
							ctx.shadowBlur  = 0;
						}*/

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
						            color : '#f5255f'
						        }
						    })
						);

					},
					animate:function(){
						var _this = this;
						d3.interval(function(){
							animateIndex++;
							/*if(_this.mapJson.geoJson.features.length <= animateIndex){
								animateIndex = 0;
							}*/
							if(animateIndex > 19){
								animateIndex = 15;
							}
							_this.redraw();
						},5500);
					},
					redraw:function(){
						this.context.clearRect(0,0,800,780);
						this.draw(this.mapJson);
					},
					getPx:function(points){
						return this.chart.convertToPixel('geo',points);
					}
				}
			})();


			//poor.render();

		})


		var chart_1 = echarts.init($("#sh").get(0));
		var option = {
			animationDuration:5000,
		    title : {
		    	show:false,
		        text: '本年度预脱贫情况',
		        x:"0%",
		        y:"10%",
		        textStyle:{
		        	fontSize:16,
		        	color:"white"
		        }
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		    	show:false
		    },
		    color:["#47eaea","#37b971"],
		    series : [
		        {
		            name: '',
		            type: 'pie',
		            radius : '55%',
		            center: ['50%', '50%'],
		            label:{
		            	normal:{
		            		show:true,
		            		position:"outside"
		            	}
		            },
		            labelLine:{
		            	normal:{
		            		show:true
		            	}
		            },

		            data:[
		                {value:39, name:'预脱贫数',label:
		                	{normal:
		                		{
		                			
		                			formatter:function (d) {
				                	 	return d.name + "\n"+ d.percent + "%" 
				                	},
				                	textStyle:{
				                	 	fontSize:16,
				                	 	color:"white"
				                	}
		                		}	
		                	},
		                	itemStyle:{
		                		normal:{
		                			 color:{
									    type: 'linear',
									    x: 0,
									    y: 0,
									    x2: 0,
									    y2: 1,
									    colorStops: [{
									        offset: 0, color: '#47eaea' // 0% 处的颜色
									    }, {
									        offset: 0.5, color: '#2dbaba' // 100% 处的颜色
									    },{
									        offset: 1, color: '#47eaea' // 100% 处的颜色
									    }],
									    globalCoord: false // 缺省为 false
									}
		                		}
		                	}
		                },
		                {value:61, name:'未脱贫数',label:
		                	{normal:
		                		{
		                			
		                			formatter:function (d) {
				                	 	return d.name + "\n"+ d.percent + "%" 
				                	},
				                	textStyle:{
				                	 	fontSize:16,
				                	 	color:"white"
				                	}
		                		}	
		                	},
		                	itemStyle:{
		                		normal:{
		                			 color:{
									    type: 'linear',
									    x: 0,
									    y: 0,
									    x2: 0,
									    y2: 1,
									    colorStops: [{
									        offset: 0, color: '#37b971' // 0% 处的颜色
									    }, {
									        offset: 0.5, color: '#27a159' // 100% 处的颜色
									    },{
									        offset: 1, color: '#37b971' // 100% 处的颜色
									    }],
									    globalCoord: false // 缺省为 false
									}
		                		}
		                	}
		                }
		            ]
		        }
		    ]
		};
		chart_1.setOption(option);


		var chart_2 = echarts.init($("#hj").get(0));
		var option =  {
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
		            data : ['产业就业发展', '移民搬迁安置', '低保政策兜底', '医疗救助扶持', '灾后重建帮扶', '其他措施帮扶'],
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
		            		fontSize:14
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
		            data:[32, 22, 23, 9, 18, 31],
		            label:{
		            	normal:{
		            		show:true,
		            		position:"top",
		            		textStyle:{
		            			color:"white",
		            			fontSize:14
		            		}
		            	}
		            },
		            itemStyle:{
		            	normal:{
		            		color:function (a,b) {
		            			return {
								    type: 'linear',
								    x: -2,
								    y: 0.7,
								    x2: 3,
								    y2: 0.3,
								    colorStops: [{
								        offset: 0, color: '#19aa88' // 0% 处的颜色
								    },{
								        offset: 0.37, color: '#19aa88' // 100% 处的颜色
								    }, {
								        offset: 0.5, color: 'rgba(0,0,0,0.4)' // 100% 处的颜色
								    },{
								        offset: 0.63, color: '#19aa88' // 100% 处的颜色
								    },{
								        offset: 1, color: '#19aa88' // 100% 处的颜色
								    }],
								    globalCoord: false // 缺省为 false
									
				            	}
		            		}
		            	}
		            }
		        }
		    ]
		};
		chart_2.setOption(option);


		var chart_3 = echarts.init($("#lddd").get(0));
		var option =  {
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
		            data : ['项目整合兜底', '医疗救助兜底', '住房建设兜底', '教育助学兜底', '产业造血兜底', '教育培训兜底'],
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
		            		fontSize:14
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
		            data:[32, 22, 23, 9, 18, 31],
		            label:{
		            	normal:{
		            		show:true,
		            		position:"top",
		            		textStyle:{
		            			color:"white",
		            			fontSize:14
		            		}
		            	}
		            },
		            itemStyle:{
		            	normal:{
		            		color:function (a,b) {
		            			return {
								    type: 'linear',
								    x: -2,
								    y: 0.7,
								    x2: 3,
								    y2: 0.3,
								    colorStops: [{
								        offset: 0, color: '#a6631f' // 0% 处的颜色
								    },{
								        offset: 0.37, color: '#a6631f' // 100% 处的颜色
								    }, {
								        offset: 0.5, color: 'rgba(0,0,0,0.4)' // 100% 处的颜色
								    },{
								        offset: 0.63, color: '#a6631f' // 100% 处的颜色
								    },{
								        offset: 1, color: '#a6631f' // 100% 处的颜色
								    }],
								    globalCoord: false // 缺省为 false
				            	}
		            		}
		            	}
		            }
		        }
		    ]
		};
		chart_3.setOption(option);



		d3.selectAll("#jz .p .report-growth")
		  .append("svg")
		  .attr("viewBox","0 0 1024 1024")
		  .attr("width",18)
		  .attr("height",18)
		  .append("path")
		  .attr("d","M761.719 992.393h-513.741l9.933-498.483-222.703-1.314 469.299-466.671 473.975 476.604-221.406 2.645z")
		  .attr("fill","#72ffbb");

})