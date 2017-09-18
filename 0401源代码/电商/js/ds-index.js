$(function(){
	if(!window.chartList){
		window.chartList = [];
	}
	
	/*假数据地址配置*/
	window.urls = {
		//电商发展数据
		"numdata_0":"./json/numdata_0.json",
		"numdata_1":"./json/numdata_1.json",
		"numdata_2":"./json/numdata_2.json",
		"numdata_3":"./json/numdata_3.json",
		//网店数量发展
		"devdata_0":"./json/devdata_0.json",
		"devdata_1":"./json/devdata_1.json",
		"devdata_2":"./json/devdata_2.json",
		//物流及就业
		"logisticAndEmployment":"./json/logisticAndEmployment.json",
		//各区域电商交易额
		"regionalTransation":"./json/regionalTransation.json",
		//中间物流输出地图数据
		"middleMap":"./json/middleMap.json",
		//电商扶贫数据
		"electricityProperty":"./json/electricityProperty.json",
		//农民收入及网络覆盖率
		"farmerAndCoverage":"./json/farmerAndCoverage.json"
	}


	/*中间水波纹效果*/
	var rippleChart = echarts.init($('#rippleBg')[0]);
	var rippleOption = {
		grid : {
			left : 0,
			top  : 0,
			right : 0,
			bottom : 0
		},
	    xAxis: {
	    	show:false,
	        splitLine: {
	        	show : false
	        },
	        min : 0,
	        max : 200
	    },
	    yAxis: {
	    	show:false,
	        splitLine: {
	        	show : false,
	        },
	        scale: true,
	        min : 0,
	        max : 200		
	    },
	    series: [
	    	{
	            name: '',
	            type: 'effectScatter',
	            coordinateSystem: 'cartesian2d',
	            data: [{
	            	name:"",
	            	value:[102, 89]
	            }],
	            symbolSize: 1,
	            showEffectOn: 'render',
	            rippleEffect: {
	                brushType: 'stroke',
	                scale:1000
	            },
	            label: {
	                normal: {  
	                    show: false
	                }
	            },
	            itemStyle: {
	                normal: {
						color: 'rgba(64,132,167,0.7)',
	                    shadowBlur: 10,
	                    shadowColor: '#4084a7'
	                }
	            },
	            zlevel: 1
	        }
        ]
	};
	rippleChart.setOption(rippleOption);
	
	/*中间物流地图*/
	$.ajax({
		type:"GET",
		url:"./json/china.json",
		dataType:"json",
		headers:{
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
			"X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")
		}
	}).done(function(res){
		var CHNjson = res;
		echarts.registerMap('CHN', CHNjson);
		$.ajax({
			type:"GET",
			url:urls.middleMap,
			dataType:"json",
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
				"X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")
			}
		}).done(function(datas){	
			var mapChart = echarts.init($('#map')[0]);
			chartList.push(mapChart);
			var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
			var convertData = function (data) {
			    var res = [];
			    for (var i = 0; i < data.length; i++) {
			        var dataItem = data[i];
			        var fromCoord = datas.coordinate[dataItem[0].name];
			        var toCoord = datas.coordinate[dataItem[1].name];
			        
			        var colorR = '#ffffff';
			        if(dataItem[1].name == '成都'){
			        	colorR = '#de0015';
			        }else if(dataItem[1].name == '西安'){
			        	colorR = '#e89006';
			        }else if(dataItem[1].name == '长沙'){
			        	colorR = '#09dee6';
			        }
			        
			        if (fromCoord && toCoord) {
			            res.push({
			                fromName: dataItem[0].name,
			                toName: dataItem[1].name,
			                coords: [fromCoord, toCoord],
			                lineStyle:{
			                	normal:{
			                		color:colorR,
			                		width:0.8
			                	}
			                }
			            });
			        }
			    }
			    return res;
			};
			
			var color = ['white'];
			var series = [];
			[['陇南', datas.value]].forEach(function (item, i) {
			    series.push(
			    	{
			    		name:"layertwo",
		                type: 'map',
		                roam: false,
		                map: 'CHN',
		                zlevel:6,
		                itemStyle:{
		                    normal:{
		                        areaColor:"rgba(0,0,0,0)",
		                        borderColor:"#ffffff",
		                        shadowColor:"#ffffff",
		                        shadowBlur:10,
		                        borderWidth:3
		                    },
		                    emphasis: {
				                areaColor: 'rgba(19,96,164,0)'
				            }
		                }
		            },
				    {
				        name: item[0] + ' Top10',
				        type: 'lines',
				        zlevel: 7,
				        symbol: ['none'],
				        symbolSize: 10,
						effect : {
		                    show: true,
		                    symbolSize: 8,
		                    period: 8,
		                    shadowBlur: 6
		                },
				        lineStyle: {
				            normal: {
				            	color:color[i],
				                width: 1,
				                opacity: 0.6,
				                curveness: 0.3
				            }
				        },
				        data: convertData(item[1])
				    },
				    {
				        name: item[0] + ' Top10',
				        type: 'effectScatter',
				        coordinateSystem: 'geo',
				        zlevel: 7,
				        rippleEffect: {
				            brushType: 'stroke'
				        },
				        label: {
				            normal: {
				                show: true,
				                position: 'right',
				                offset:[5,0],
				                formatter: '{b}'
				            }
				        },
				        symbolSize: function (val) {
				            return val[2] / 8;
				        },
				        itemStyle: {
				            normal: {
				                color: color[i]
				            }
				        },
				        data: item[1].map(function (dataItem) {
				            return {
				                name: dataItem[1].name,
				                value: datas.coordinate[dataItem[1].name].concat([dataItem[1].value]),
				                itemStyle: {
						            normal: {
						                color: (function(){
						                	if (dataItem[1].name == "成都"){
						                		return "#de0015"
						                	}else if(dataItem[1].name == "西安"){
						                		return "#e89006"
						                	}else if(dataItem[1].name == "长沙"){
						                		return "#09dee6"
						                	}else{
						                		return "#ffffff"
						                	}
						                }())
						            }
						        },
				            };
				        })
				    }
		    	);
			});
			
			mapOption = {
			    backgroundColor: 'rgba(255,255,255,0)',
			    tooltip : {
			        trigger: 'item',
			        formatter:function(e){
			        	if(e.seriesName === "陇南 Top10"){
				            return "陇南-" + datas.value[e.dataIndex][1].name
			            }
			        }
			    },
			    geo: {
			        map: 'china',
			        zlevel:5,
			        label: {
			            emphasis: {
			                show: false
			            }
			        },
			        roam: false,
			        itemStyle: {
			            normal: {
			                areaColor: 'rgba(19,96,164,1)',
			                borderColor: '#174c97'
			            },
			            emphasis: {
			                areaColor: 'rgba(19,96,164,0.1)'
			            }
			        }
			    },
			    series: series
			};
			mapChart.setOption(mapOption);
		})
		
		//底部显示地图厚度与阴影的图层
		var maplayChart = echarts.init($('.mapLegendlayer')[0]);
		chartList.push(maplayChart);
		var color = ['white'];
		maplayOption = {
		    backgroundColor: 'rgba(255,255,255,0)',
		    tooltip : {
		        trigger: 'item',
		        formatter:function(e){
		            return ""
		        }
		    },
		    series: [{
		    		name:"layerone",
	                type: 'map',
	                roam: false,
	                map: 'CHN',
	                top:"108",
	                zlevel:0,
	                itemStyle:{
	                    normal:{
	                        areaColor:"rgba(19,96,164,1)",
	                        borderColor:"rgba(0,0,0,0)",
	                        shadowColor:"black",
	                        shadowBlur:15,
	                        shadowOffsetX:-15,
	                        shadowOffsetY:10
	                    },
	                    emphasis: {
			                areaColor: 'rgba(19,96,164,1)'
			            }
	                }
	            }]
		};
		maplayChart.setOption(maplayOption);
	});
	
	
	/*电商发展柱状图*/
	var devChart;
	var devFunc = function(a,b,c,e,f){
		if(!devChart){
			devChart = echarts.init($(".lt-1-2")[0]);
			chartList.push(devChart);
		}
		var devOption = {
			animationDuration: 4000,
			title:{
				text:"单位：亿元",
				textStyle:{
					color:"#9d9d9d",
					fontSize:16,
					fontWeight:"normal" 
				},
				top:40
			},
		    tooltip : {
		        trigger: 'axis',
		        confine:true
		    },
		    legend: {
		    	right:'5%',
		        top:'0px',
		        textStyle:{
		        	color:"#b9b9bb",
		        	fontSize:16
		        },
		        data:[
		        	{	name:e,
		        		icon:"rect"
		        	},
		        	{	name:f,
		        		icon:"rect"
		        	}
		        ],
		        itemHeight:7
		    },
		    grid:{
		    	top:40,
		    	bottom:25,
		    	left:-50,
		    	right:0
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : a,
		            axisLine:{
		                show:false
		            },
		            axisTick:{
		                show:false
		            },
		            axisLabel:{
		            	textStyle:{
		            		color:"#818286",
		            		fontSize:16
		            	}
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            show:false
		        }
		    ],
		    series : [
		        {
		            name:e,
		            type:'bar',
		            data:b,
		            itemStyle:{
		            	normal: {
			                color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1,
		                        [
		                            {offset: 0, color: 'rgba(47,143,157,0)'},
		                            {offset: 0.5, color: 'rgba(47,143,157,0.3)'},
		                            {offset: 1, color: '#2f8f9d'}
		                        ]
		                    ),
		                    borderColor:"#2f8f9d"
		               }
		            },
		            barWidth:"40px",
		            label: {
		                normal: {
		                    show: true,
		                    position: 'top',
		                    textStyle:{
		                    	color:"#f0f7ff",
		                    	fontSize:16
		                    }
		                }
		            }
		        },
		        {
		            name:f,
		            type:'bar',
		            data:c,
		            itemStyle:{
		            	normal: {
			                color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1,
		                        [
		                            {offset: 0, color: 'rgba(148,91,36,0)'},
		                            {offset: 0.5, color: 'rgba(148,91,36,0.3)'},
		                            {offset: 1, color: '#945b24'}
		                        ]
		                   ),
		                   borderColor:"#945b24"
		               }
		            },
		            barWidth:"40px",
		            label: {
		                normal: {
		                    show: true,
		                    position: 'top',
		                    textStyle:{
		                    	color:"#f0f7ff",
		                    	fontSize:16
		                    }
		                }
		            }
		        }
		    ]
		};
		devChart.setOption(devOption);
	}
	
	var getDevData = function(d){
		$.ajax({
			type:"GET",
			url:urls[d],
			dataType:"json",
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
				"X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")
			}
		}).done(function(res){
			var xA = res.xAxis;
			var seriesOne = res.dataup.array;
			var seriesTwo = res.datadown.array;
			devFunc(xA,seriesOne,seriesTwo,res.dataup.name,res.datadown.name);
			$(".txt_odd").eq(0).children("span").eq(0).text(res.textup);
			$(".txt_odd").eq(1).children("span").eq(0).text(res.textdown);
		})
	}
	
	//第一次初始化渲染电商发展柱状图
	getDevData("devdata_0");
	
	//电商发展时间轴滚动
	var devLen = $(".dev_content").children().length/2;
	var j = 0;
	//自动滚动播放
	var devtimerCall = function(){
		j++;
		if(j <= (2*devLen-3)){
			$(".dev_content").css("transition","top 0.8s ease-out");
			$(".dev_content").css("top",-63*j+"px");
			setTimeout(function(){
				$(".dev_content").children().eq(j+1).addClass("lt-1l1-active").siblings().removeClass("lt-1l1-active");
			},800);
			getDevData("devdata_"+(j%devLen));
		}else{
			$(".dev_content").css("transition","top 0s ease-out");
			j=j-devLen-1;
			$(".dev_content").children().eq(j+1).addClass("lt-1l1-active").siblings().removeClass("lt-1l1-active");
			$(".dev_content").css("top",-63*(devLen-3)+"px");
		}
	}
	var devtimer = setInterval(devtimerCall,4000)

	//点击滚动至指定年份
	$(".dev_content div").on("click",function(){
		var devIndex = $(this).index();
		if($(this).hasClass("lt-1l1-active")){
			return
		}else{
			clearInterval(devtimer);
			if(!$(this).hasClass("lt-1l1-active") && $(this).next().hasClass("lt-1l1-active")){
				if(devIndex>=1){
					j--;
				}else{
					j=devLen-1;
				}
			}else if(!$(this).hasClass("lt-1l1-active") && $(this).parent().children().eq(devIndex-1).hasClass("lt-1l1-active")){
				if(devIndex === devLen*2-1){
					j = devLen-2;
				}else{
					j++;
				}
			}
			$(".dev_content").css("transition","top 0.8s ease-out");
			$(".dev_content").css("top",-63*j+"px");
			setTimeout(function(){
				$(".dev_content").children().eq(j+1).addClass("lt-1l1-active").siblings().removeClass("lt-1l1-active");
				devtimer = setInterval(devtimerCall,4000);
			},800)
			getDevData("devdata_"+(j%devLen));
		}
	})
	
	$(".dev_content div").on("mousedown",function(e){
		if(e.button === 2){
			var devIndexmenu = $(this).index();
			clearInterval(devtimer);
			if(!$(this).hasClass("lt-1l1-active") && $(this).next().hasClass("lt-1l1-active")){
				if(devIndexmenu>=1){
					j--;
				}else{
					j=devLen-1;
				}
			}else if(!$(this).hasClass("lt-1l1-active") && $(this).parent().children().eq(devIndexmenu-1).hasClass("lt-1l1-active")){
				if(devIndexmenu === devLen*2-1){
					j = devLen-2;
				}else{
					j++;
				}
			}
			$(".dev_content").css("transition","top 0.8s ease-out");
			$(".dev_content").css("top",-63*j+"px");
			setTimeout(function(){
				$(".dev_content").children().eq(j+1).addClass("lt-1l1-active").siblings().removeClass("lt-1l1-active");
			},800)
			getDevData("devdata_"+(j%devLen));
		}
	})
		
	
	
	/*物流发展状况折线图*/
	$.ajax({
		type:"GET",
		url:urls.logisticAndEmployment,
		dataType:"json",
		headers:{
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
			"X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")
		}
	}).done(function(res){
		var logisticsChart = echarts.init($(".lt-2-l-chart")[0]);
		chartList.push(logisticsChart);
		var logisticsOption = {
			animationDuration: 4000,
			title:{
				text:"单位：个",
				textStyle:{
					color:"#b9b9bb",
					fontSize:16,
					fontWeight:"normal" 
				},
				top:10,
				left:-5
			},
		    color:["#48ed9e","#ff8e14"],
	     	legend: {
		        right:'5%',
		        top:'0px',
		        textStyle:{
		        	color:"#b9b9bb",
		        	fontSize:16
		        },
		        data:[
		        	{	name:res.logistic.datatwo.name,
		        		icon:"rect"
		        	},
		        	{	name:res.logistic.dataone.name,
		        		icon:"rect"
		        	}
		        ],
		        itemHeight:7
		    },
		    tooltip : {
		        trigger: 'axis',
		        confine:true,
		        axisPointer: {
		            type: 'cross',
		            label: {
		                backgroundColor: '#6a7985'
		            }
		        }
		    },
		    grid: {
		        left: -50,
		        right: 15,
		        bottom: '1%',
		        containLabel: true,
		        show:false
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : res.logistic.xAxis,
		            axisLine:{
		                show:false
		            },
		            axisTick:{
		                show:false
		            },
	            	axisLabel:{
	            		textStyle:{
	            			color:"#b9b9bb",
	            			fontSize:16
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
		                show:false
		            },
		            axisTick:{
		                show:false
		            },
	            	axisLabel:{
	            		show:false
	            	}
		        }
		    ],
		    series : [
		        {
		            name:res.logistic.dataone.name,
		            type:'line',
		            stack: '总量',
		            lineStyle:{
		            	normal:{
		            		color:"#48ed9e"
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
						        offset: 0, color: 'rgba(72, 237, 158, 1)' // 0% 处的颜色
						    }, {
						        offset: 1, color: 'rgba(72, 237, 158, 0)' // 100% 处的颜色
						    }],
						    globalCoord: false  // 缺省为 false
						}
		            }},
		            label: {
		                normal: {
		                    show: true,
		                    position: 'top',
		                    textStyle:{
		                    	color:"#d1d1d1",
		                    	fontSize:14
		                    }
		                }
		            },
		            data:res.logistic.dataone.array
		        },
		        {
		            name:res.logistic.datatwo.name,
		            type:'line',
		            stack: '总量',
		            lineStyle:{
		            	normal:{
		            		color:"#ff8e14"
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
						        offset: 0, color: 'rgba(255,142,20, 1)' // 0% 处的颜色
						    }, {
						        offset: 1, color: 'rgba(255,142,20, 0)' // 100% 处的颜色
						    }],
						    globalCoord: false // 缺省为 false
						}
		            }},
		            label: {
		                normal: {
		                    show: true,
		                    position: 'top',
		                    textStyle:{
		                    	color:"#d1d1d1",
		                    	fontSize:14
		                    }
		                }
		            },
		            data:res.logistic.datatwo.array
		        }
		    ]
		}
		logisticsChart.setOption(logisticsOption);
		
		$(".num").eq(0).text(res.employment.circleone.number);
		$(".text").eq(0).text(res.employment.circleone.text);
		$(".num").eq(1).text(res.employment.circletwo.number);
		$(".text").eq(1).text(res.employment.circletwo.text);
		$(".num").eq(2).text(res.employment.circlethree.number);
		$(".text").eq(2).text(res.employment.circlethree.text);
		$(".num_sty1").eq(0).text(res.employment.circletwo.employpeople);
		$(".num_sty2").eq(0).text(res.employment.circletwo.employmoney);
		$(".num_sty1").eq(1).text(res.employment.circlethree.employpeople);
		$(".num_sty2").eq(1).text(res.employment.circlethree.employmoney);
	})
	
	
	/*各区域电商交易额柱状图*/
	$.ajax({
		type:"GET",
		url:urls.regionalTransation,
		dataType:"json",
		headers:{
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
			"X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")
		}
	}).done(function(res){
		var transactionChart = echarts.init($(".lt-3-chart")[0]);
		chartList.push(transactionChart);
		var transactionOption = {
			animationDuration: 4000,
		    tooltip : {
		        trigger: 'axis',
		        confine:true
		    },
		    legend: {
		        data:[
		        	{
		        		name:res.dataone.name,
		        		icon:"rect",
		        		textStyle:{
		        			fontSize:16,
		        			color:"#c9c9c7"
		        		}
		        	},
		        	{
		        		name:res.datatwo.name,
		        		icon:"rect",
		        		textStyle:{
		        			fontSize:16,
		        			color:"#c9c9c7"
		        		}
		        	}
		        ],
		        right:0,
		        itemHeight:7
		    },
		    grid:{
		    	top:40,
		    	bottom:35,
		    	left:-25,
		    	right:-25
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : res.xAxis,
		            axisLine:{
		                show:false
		            },
		            axisTick:{
		                show:false
		            },
		            axisLabel:{
		            	textStyle:{
		            		color:"#9c9c9c",
		            		fontSize:16
		            	}
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            show:false
		        }
		    ],
		    series : [
		        {
		            name:res.dataone.name,
		            type:'bar',
		            data:res.dataone.array,
		            itemStyle:{
		            	normal: {
			                color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1,
		                        [
		                            {offset: 0, color: 'rgba(13,172,132,0)'},
		                            {offset: 0.5, color: 'rgba(13,172,132,0.3)'},
		                            {offset: 1, color: '#0dac84'}
		                        ]
		                    ),
		                    borderColor:"#0dac84"
		               }
		            },
		            barWidth:"35px",
		            label: {
		                normal: {
		                    show: true,
		                    position: 'top',
		                    textStyle:{
		                    	color:"#c9c9c7",
		                    	fontSize:16
		                    }
		                }
		            }
		        },
		        {
		            name:res.datatwo.name,
		            type:'bar',
		            data:res.datatwo.array,
		            itemStyle:{
		            	normal: {
			                color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1,
		                        [
		                            {offset: 0, color: 'rgba(47,145,154,0)'},
		                            {offset: 0.5, color: 'rgba(47,145,154,0.3)'},
		                            {offset: 1, color: '#2f919a'}
		                        ]
		                    ),
		                    borderColor:"#2f919a"
		               }
		            },
		            barWidth:"35px",
		            label: {
		                normal: {
		                    show: true,
		                    position: 'top',
		                    textStyle:{
		                    	color:"#c9c9c7",
		                    	fontSize:16
		                    }
		                }
		            }
		        }
		    ]
		};
		transactionChart.setOption(transactionOption);
	})


	/*电商扶贫折线图*/
	$.ajax({
		type:"GET",
		url:urls.electricityProperty,
		dataType:"json",
		headers:{
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
			"X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")
		}
	}).done(function(res){
		var povertyChart = echarts.init($(".rt-1-1-chart")[0]);
		chartList.push(povertyChart);
		var povertyOption = {
			animationDuration: 4000,
		    tooltip : {
		        trigger: 'axis',
		        confine:true,
		        formatter:"{b}<br/>{a0} : {c0}万人<br/>{a1} : {c1}%"
		    },
		    grid:{
		    	top:70,
		    	bottom:25,
		    	left:-30,
		    	right:-25
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : res.chart.xAxis,
		            axisLine:{
		                show:false
		            },
		            axisTick:{
		                show:false
		            },
		            axisLabel:{
		            	textStyle:{
		            		color:"#8d8e90",
		            		fontSize:16
		            	}
		            }
		        }
		    ],
		    yAxis : [
		    	{
		            type: 'value',
		            name: res.chart.bar.name,
		            show:false
		        },
		        {
		            type: 'value',
		            name: res.chart.line.name,
		            show:false
		        }
		    ],
		    series : [
		        {
		            name:res.chart.bar.name,
		            type:'bar',
		            data:res.chart.bar.array,
		            itemStyle:{
		            	normal: {
			                color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1,
		                        [
		                            {offset: 0, color: 'rgba(47,143,155,0)'},
		                            {offset: 1, color: '#2f8f9b'}
		                        ]
		                    ),
		                    borderColor:"#2f8f9b"
		               }
		            },
		            barWidth:"35px",
		            label: {
		                normal: {
		                    show: true,
		                    position: 'top',
		                    textStyle:{
		                    	color:"#d0d1d5",
		                    	fontSize:16
		                    },
		                    formatter:'{c}万人'
		                }
		            }
		        },
		        {
		            name:res.chart.line.name,
		            type:'line',
		            data:res.chart.line.array,
		            label: {
		                normal: {
		                    show: true,
		                    position: 'bottom',
		                    textStyle:{
		                    	color:"#fffffd",
		                    	fontSize:16
		                    },
		                    formatter:'{c}%'
		                }
		            },
		            itemStyle:{
		            	normal:{
		            		color:"#43b1b0"
		            	}
		            },
		            lineStyle:{
		            	normal:{
		            		color:"#43b1b0"
		            	}
		            }
		        }
		    ]
		};
		povertyChart.setOption(povertyOption);
		$(".rt-1-1-txt").children("").eq(1).text(res.chart.bar.array[res.chart.bar.array.length-1]);
		$(".rt-1-2-txt").children("span").eq(1).text(res.peopleReduce);
		$(".rt-1-3-1").children("span").eq(0).text(res.rateReduce.before);
		$(".rt-1-3-2").children("span").eq(0).text(res.rateReduce.now);
		$(".rt-1-3-3").children("span").eq(1).text((res.rateReduce.before-res.rateReduce.now).toFixed(2));
		$(".rt-1-4-1").children("span").eq(1).text(res.employ.numone);
		$(".rt-1-4-2").children("span").eq(1).text(res.employ.numtwo);
	})
	
	/*网络覆盖率柱状图*/
	$.ajax({
		type:"GET",
		url:urls.farmerAndCoverage,
		dataType:"json",
		headers:{
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
			"X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")
		}
	}).done(function(res){
		var netChart = echarts.init($(".rt-2-bot-chart")[0]);
		chartList.push(netChart);
		var netOption = {
			animationDuration: 4000,
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'shadow'
		        },
		        formatter:"{a}<br/>{b} : {c}%"
		    },
		    grid: {
		    	top:0,
		        left: 5,
		        right: 110,
		        bottom: -20,
		        containLabel: true
		    },
		    xAxis: {
		        type: 'value',
		        show:false
		    },
		    yAxis: {
		        type: 'category',
		        data: res.coverage.yAxis,
		        axisLine:{
	                show:false
	            },
	            axisTick:{
	                show:false
	            },
	            axisLabel:{
	            	textStyle:{
	            		color:"#9d9d9d",
	            		fontSize:16
	            	}
	            }
		    },
		    series: 
		        {
		            name: res.coverage.name,
		            type: 'bar',
		            data: res.coverage.data,
		            label: {
		                normal: {
		                    show: true,
		                    position: 'right',
		                    offset: [15,0],
		                    textStyle:{
		                    	color:"#9d9d9d",
		                    	fontSize:16
		                    },
		                    formatter:'{c}%'
		                }
		            },
		            itemStyle:{
		            	normal: {
			                color: new echarts.graphic.LinearGradient(
		                        0, 0, 1, 0,
		                        [
		                            {offset: 0, color: '#3e82a9'},
		                            {offset: 0.5, color: 'rgba(62,130,169,0.3)'},
		                            {offset: 1, color: 'rgba(62,130,169,0)'}
		                        ]
		                    ),
		                    borderColor:"#3e82a9"
		               }
		            },
		            barWidth:"14px"
		        }
		    
		}
		netChart.setOption(netOption);
		$(".rt-2-top-txt-1").children("span").eq(0).text(res.farmer.contribution);
		$(".rt-2-top-txt-2").children("span").eq(1).text(res.farmer.increase);
		$(".rt-2-top-txt-3").children("span").eq(0).text(res.farmer.now);
		$(".rt-2-top-txt-4").children("span").eq(0).text(res.farmer.before);
	});
	
	
	/*网络数量发展地图*/
	var netmapChart;
	var longnanJson;
	var netFunc = function(a,b){
		if(!netmapChart){
			netmapChart = echarts.init($("#rt-3-map-r")[0]);
			chartList.push(netmapChart);
		}
		netmapChart.clear();
		var netcolor = ['white'];
		echarts.registerMap('LONG', longnanJson);
		netmapOption = {
			animationDuration: 4000,
		    backgroundColor: 'rgba(0,0,0,0)',
		    tooltip : {
		        trigger: 'item',
		        formatter:function(e){
		        	return e.value[2]
		        }
		    },
		    geo: {
		        map: 'longnan',
		        label: {
		            emphasis: {
		                show: false
		            }
		        },
		        roam: false,
		        zoom:1.1,
		        label: {
		            normal: {
		                show: true,
		                textStyle:{color:"#fefeff"}
		            },    
		            emphasis: {
		                show: true,
		                textStyle:{color:"#fefeff"}
		            } 
		        },
		        itemStyle: {
		            normal: {
		                borderWidth: 1,
		                borderColor: 'rgba(255,255,255,0.5)',
		                areaColor:"rgba(33,149,204,0.8)",
		            },
		            emphasis: {
		                borderWidth: 1,
		                borderColor: 'rgba(255,255,255,0.5)',
		                areaColor:"rgba(33,149,204,0.8)",
		            }
		        }
		    },
		    series: [
		    	{
	                type: 'map',
	                roam: false,
	                map: 'LONG',
	                zoom:1.1,
	                itemStyle:{
	                    normal:{
	                        areaColor:"rgba(0,0,0,0)",
	                        borderColor:"#2195cc",
	                        shadowColor:"#c5d1de",
	                        shadowBlur:25,
	                        borderWidth:2
	                    },
	                    emphasis: {
			                areaColor: 'rgba(19,96,164,0)'
			            }
	                }
	            },
			    {
			        name: "s",
			        type: 'effectScatter',
			        coordinateSystem: 'geo',
			        zlevel: 2,
			        rippleEffect: {
			            brushType: 'stroke'
			        },
			        label: {
			            normal: {
			                show: true,
			                position: 'right',
			                formatter: '{b}'
			            }
			        },
			        symbolSize: function (val) {
			            return val[2] / 8;
			        },
			        itemStyle: {
			            normal: {
			                color: "#f4fd30"
			            }
			        },
			        data: a.map(function (dataItem) {
			            return {
			                value: b[dataItem[0].name].concat([dataItem[0].value])
			            };
			        })
			    }
		    ]
		};
		netmapChart.setOption(netmapOption);
	}
	
	var  getNumData = function(c){
		$.ajax({
			type:"GET",
			url:urls[c],
			dataType:"json",
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
				"X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")
			}
		}).done(function(res){
				var netLNData = res.valueArray;
				var netgeoCoordMap = res.location;
				netFunc(netLNData,netgeoCoordMap);
				$(".rt-3-map-l-2>div").eq(0).find("span").eq(0).text(res.numberone);
				$(".rt-3-map-l-2>div").eq(1).find("span").eq(0).text(res.numbertwo);
		});
	}
	
	//初次渲染网络数量发展地图
	$.ajax({
		type:"GET",
		url:"./json/longnanshi.json",
		dataType:"json",
		headers:{
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
			"X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")
		}
	}).done(function(res){
		longnanJson = res;
		getNumData("numdata_0");
	});

	//网店数量发展动画:时间轴滚动播放
	var timeLen = $(".time_content").children().length/2;
	var i = 0;
	
	//自动滚动播放
	var timerCall = function(){
		i++;
		if(i <= ((timeLen-2)*2)){
			$(".time_content").css("transition","top 0.8s ease-out");
			$(".time_content").css("top",-45*i+"px");
			setTimeout(function(){
				$(".time_content").children().eq(i).removeClass("sty_two sty_thr").addClass("sty_one");
				$(".time_content").children().eq(i+1).removeClass("sty_one sty_thr").addClass("sty_two");
				$(".time_content").children().eq(i+2).removeClass("sty_two sty_one").addClass("sty_thr");
				$(".time_content").children().eq(i+3).removeClass("sty_two sty_thr").addClass("sty_one");
			},800);
			getNumData("numdata_"+(i%timeLen));
		}else{
			$(".time_content").css("transition","top 0s ease-out");
			$(".time_content").children().eq(timeLen-4).removeClass("sty_two sty_thr").addClass("sty_one");
			$(".time_content").children().eq(timeLen-3).removeClass("sty_one sty_thr").addClass("sty_two");
			$(".time_content").children().eq(timeLen-2).removeClass("sty_two sty_one").addClass("sty_thr");
			$(".time_content").children().eq(timeLen-1).removeClass("sty_two sty_thr").addClass("sty_one");
			$(".time_content").css("top",-45*(timeLen-4)+"px");
			i=i-timeLen-1;
		}
	}
	var timer = setInterval(timerCall,4000)

	//左键点击滚动至指定年份
	$(".time_content div").on("click",function(){
		var thisIndex = $(this).index();
		if($(this).hasClass("sty_thr")){
			return
		}else{
			clearInterval(timer);
			if($(this).hasClass("sty_one") && $(this).next().hasClass("sty_two") && thisIndex<=timeLen-1){
				if(thisIndex>=2){
					i=i-2;
				}else{
					i=i+2;
				}
			}else if($(this).hasClass("sty_one") && $(this).parent().children().eq(thisIndex-1).hasClass("sty_thr")){
				if(thisIndex === $(".time_content").children().length-1){
					i = timeLen-3;
				}else{
					i++;
				}
			}else if($(this).hasClass("sty_two") && $(this).parent().children().eq(thisIndex-1).hasClass("sty_one") && $(this).next().hasClass("sty_thr")){
				if(thisIndex === 1){
					i = timeLen-1;
				}else{
					i--;
				}
			}
			$(".time_content").css("transition","top 0.8s ease-out");
			$(".time_content").css("top",-45*i+"px");
			setTimeout(function(){
				$(".time_content").children().eq(i).removeClass("sty_two sty_thr").addClass("sty_one");
				$(".time_content").children().eq(i+1).removeClass("sty_one sty_thr").addClass("sty_two");
				$(".time_content").children().eq(i+2).removeClass("sty_two sty_one").addClass("sty_thr");
				$(".time_content").children().eq(i+3).removeClass("sty_two sty_thr").addClass("sty_one");
				timer = setInterval(timerCall,4000);
			},800)
			getNumData("numdata_"+(i%timeLen));
		}
	})
	
	//当点击右键时滚动到指定年份,并停止自动播放
	$(".time_content div").on("mousedown",function(e){
		if(e.button === 2){
			var thisIndexmenu = $(this).index();
			clearInterval(timer);
			if($(this).hasClass("sty_one") && $(this).next().hasClass("sty_two") && thisIndexmenu<=timeLen-1){
				if(thisIndexmenu>=2){
					i=i-2;
				}else{
					i=i+2;
				}
			}else if($(this).hasClass("sty_one") && $(this).parent().children().eq(thisIndexmenu-1).hasClass("sty_thr")){
				if(thisIndexmenu === $(".time_content").children().length-1){
					i = timeLen-3;
				}else{
					i++;
				}
			}else if($(this).hasClass("sty_two") && $(this).parent().children().eq(thisIndexmenu-1).hasClass("sty_one") && $(this).next().hasClass("sty_thr")){
				if(thisIndexmenu === 1){
					i = timeLen-1;
				}else{
					i--;
				}
			}
			$(".time_content").css("transition","top 0.8s ease-out");
			$(".time_content").css("top",-45*i+"px");
			setTimeout(function(){
				$(".time_content").children().eq(i).removeClass("sty_two sty_thr").addClass("sty_one");
				$(".time_content").children().eq(i+1).removeClass("sty_one sty_thr").addClass("sty_two");
				$(".time_content").children().eq(i+2).removeClass("sty_two sty_one").addClass("sty_thr");
				$(".time_content").children().eq(i+3).removeClass("sty_two sty_thr").addClass("sty_one");
			},800)
			getNumData("numdata_"+(i%timeLen));
		}
	})
	
	//阻止鼠标右键默认事件
	document.oncontextmenu = function(){
       return false
    };
	
	
});