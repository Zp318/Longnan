$(function(){

	if(!window.chartList){
		window.chartList = [];
	}

	var rkChart = echarts.init($('#rk')[0]);
	var rkOption = {
		animationDuration: 5000,
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    color : ['#54fefe', '#44d086'],
	    series : [
	        {
	            name: '城镇人口占比',
	            type: 'pie',
	            radius : '70%',
	            center: ['50%', '50%'],
	            label:{
	            	normal:{
	            		textStyle:{
	            			color:"white",
	            			fontSize:14
	            		}
	            	}
	            },
	            data:[
	                {value:335, name:'农村人口',
	                	label:{
	                		normal:{
	                			formatter:function (d) {
			                		return d.name + "\n"+ d.percent + "%"
			                	}
	                		}
	                	}
	                	// body...
	                },
	                {value:310, name:'城市人口',label:{
                		normal:{
                			formatter:function (d) {
		                		return d.name + "\n"+ d.percent + "%"
		                	}
                		}
                	}}
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
	rkChart.setOption(rkOption);
	window.chartList.push(rkChart);

	var scChart = echarts.init($('#sc')[0]);
	var scOption = {
		animationDuration:5000,
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    color : ['#54fefe', '#44d086', '#ff6901'],
	    title:{
        	textStyle:{
        		color:"white"
        	}
        },
	    series : [
	        {
	            name: '生产总值构成',
	            type: 'pie',
	            radius : '70%',
	            center: ['50%', '50%'],

	            label:{
	            	normal:{
	            		textStyle:{
	            			color:"white",
	            			fontSize:14
	            		}
	            	}
	            },
	            data:[
	                {value:12.5, name:'第一产业',label:{
	                		normal:{
	                			formatter:function (d) {
			                		return d.name + d.percent + "%"
			                	}
	                		}
	                	}},
	                {value:20.0, name:'第二产业',label:{
	                		normal:{
	                			formatter:function (d) {
			                		return d.name + d.percent + "%"
			                	}
	                		}
	                	}},
	                {value:68.5, name:'第三产业',label:{
	                		normal:{
	                			formatter:function (d) {
			                		return d.name + d.percent + "%"
			                	}
	                		}
	                	}}
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
	scChart.setOption(scOption);
	window.chartList.push(scChart);


	var shChart = echarts.init($('#sh')[0]);
	var shOption = {
		animationDuration: 2000,
	    legend: {
	    	top : '10',
	        data:[
	        	{
	        		name : '城镇人均可支配收入',
	        		icon : 'roundRect',
	        		textStyle : {
	        			color : '#fff',
	        			fontSize : 14
	        		}
	        	},
	        	{
	        		name : '农村人均可支配收入',
	        		icon : 'roundRect',
	        		textStyle : {
	        			color : '#fff',
	        			fontSize : 14
	        		}
	        	},
	        	{
	        		name : '城镇人均收入较上年增长',
	        		icon : 'roundRect',
	        		textStyle : {
	        			color : '#fff',
	        			fontSize : 14
	        		}
	        	},
	        	{
	        		name : '农村人均收入较上年增长',
	        		icon : 'roundRect',
	        		textStyle : {
	        			color : '#fff',
	        			fontSize : 14
	        		}
	        	}
	        ]
	    },
	   	grid : {
	   		left : '50',
	   		bottom : '30',
	   		right : '25',
	   		top : '65'
	   	},
	    xAxis:  {
	        type: 'category',
	        boundaryGap: false,
	        data: ['2016Q1','2016Q2','2016Q3','2016Q4','2017Q1'],
	        axisLabel : {
	        	textStyle : {
	        		color : '#fff'
	        	}
	        },
	        axisLine : {
	        	lineStyle : {
	        		color : '#30424a'
	        	}
	        }
	    },
	    yAxis: {
	        type: 'value',
	        axisLabel: {
	            formatter: '{value}'
	        },
	        splitLine : {
	        	show : false
	        },
	        axisLabel : {
	        	textStyle : {
	        		color : '#fff'
	        	}
	        },
	        axisLine : {
	        	lineStyle : {
	        		color : '#30424a'
	        	}
	        }
	    },
	    color : ['#30c9a6','#42c983','#f76906','#d4d7db'],
	    series: [
	        {
	            name:'城镇人均可支配收入',
	            type:'line',
	            data:[2960, 4000, 4590, 4990,6000]
	        },
	        {
	            name:'农村人均可支配收入',
	            type:'line',
	            data:[2534, 2870, 3642, 4444,5000]
	        },
	        {
	            name:'城镇人均收入较上年增长',
	            type:'line',
	            data:[1300, 1400, 1500, 1600,2000]
	        },
	        {
	            name:'农村人均收入较上年增长',
	            type:'line',
	            data:[500, 800, 1200, 1400,1500]
	        }
	    ]
	};
	shChart.setOption(shOption);
	window.chartList.push(shChart);

	var hjChart = echarts.init($('#hj')[0]);
	var hjOption = {
		animationDuration:5000,
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
	    legend: {
	        data: [
	        	{
	        		name : '工业固体废物产生量',
	        		icon : 'roundRect',
	        		textStyle : {
	        			color : '#fff',
	        			fontSize : 14
	        		}
	        	},
	        	{
	        		name : '废水排放量',
	        		icon : 'roundRect',
	        		textStyle : {
	        			color : '#fff',
	        			fontSize : 14
	        		}
	        	}
	        ],
	        left :10,
	        top : 10 
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        top : '40',
	        containLabel: true
	    },
	    color : ['#51fffe', '#ff6902'],
	    yAxis: {
	        type: 'value',
	        axisLabel : {
	        	textStyle : {
	        		color : '#fff'
	        	}
	        },
	        splitLine : {
	        	show : false
	        },
	        axisLine : {
	        	lineStyle : {
	        		color : '#30424a'
	        	}
	        }
	    },
	    xAxis: {
	        type: 'category',
	        data: ['2016Q1','2016Q2','2016Q3','2016Q4','2017Q1'],
	        axisLabel : {
	        	textStyle : {
	        		color : '#fff'
	        	}
	        },
	        axisLine : {
	        	lineStyle : {
	        		color : '#30424a'
	        	}
	        }
	    },
	    series: [
	        {
	            name: '工业固体废物产生量',
	            type: 'bar',
	            barWidth : 14,
	            barGap:8,
	            label:{
	            	normal:{
	            		show:true,
	            		position:"top",
	            		textStyle:{
	            			color:"white"
	            		}
	            	}
	            },
	            data: [1890, 2880, 3540, 2477,2000]
	        },
	        {
	            name: '废水排放量',
	            barWidth : 14,
	            barGap:"60%",
	            type: 'bar',
	            label:{
	            	normal:{
	            		show:true,
	            		position:"top",
	            		textStyle:{
	            			color:"white"
	            		}
	            	}
	            },
	            data: [1421, 1722, 2100, 1333,1000]
	        }
	    ]
	};
	hjChart.setOption(hjOption);
	window.chartList.push(hjChart);

	var czChart = echarts.init($('#cz')[0]);
	var czOption = {
		animationDuration: 2000,
	    title: {
	    show:false,
 	        text: '堆叠区域图'
	    },
	    color:["white","#49d087"],
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
	        left:'3%',
	        top:'4%',
	        itemHeight:6,
	        itemWidth:14,
	        textStyle:{
	           	color:"white",
	           	fontSize:14
	        },
	        data:[
	           	{
	            	name:"公共预算收入",
	            	icon:"rect"
	           	},
	           	{
	            	name:"公共预算支出",
	            	icon:"rect"
	           	},
	           	{
	            	name:"金融机构各项存款",
	            	icon:"rect"
	           	},
	           	{
	            	name:"金融机构各项贷款",
	            	icon:"rect"
	           	}
	        ]
      	},
	      
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true,
	        show:false
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
	                   	color:"white"
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
	            axisLabel:{
	                textStyle:{
	                   	color:"white"
	                }
	            }
	        }
	    ],
	    color : ['#fff','#3fc199','#52ffff','#ff6901'],
	    series : [
	        {
	            name:'公共预算收入',
	            type:'line',
	            stack: '总量',
	            lineStyle:{
	               	normal:{
	                	color:"white"
	               	}
	            },
	            areaStyle: {
	            	normal: {
			            color:{
				          	type: 'linear',
				          	x: 1,
				          	y: 0,
				          	x2: 1,
				          	y2: 1,
				          	colorStops: [
					          	{
					              	offset: 0, color: 'rgba(255, 255, 255, 1)' // 0% 处的颜色
					          	}, 
					          	{
					              	offset: 1, color: 'rgba(255, 255, 255, 0)' // 100% 处的颜色
					          	}
			      			],
				          	globalCoord: false // 缺省为 false
				      	}
		              
	              	}
          		},
	            data:[120, 132, 101, 134, 90, 230, 210]
          	},
          	{
	            name:'公共预算支出',
	            type:'line',
	            stack: '总量',
	            lineStyle:{
	               	normal:{
	                	color:"#3fc199"
	               	}
	            },
	            areaStyle: {
	            	normal: {
			            color:{
				          	type: 'linear',
				          	x: 1,
				          	y: 0,
				          	x2: 1,
				          	y2: 1,
				          	colorStops: [
					          	{
					              	offset: 0, color: 'rgba(63, 193, 153, 1)' // 0% 处的颜色
					          	}, 
					          	{
					              	offset: 1, color: 'rgba(63, 193, 153, 0)' // 100% 处的颜色
					          	}
			      			],
				          	globalCoord: false // 缺省为 false
				      	}
		              
	              	}
          		},
	            data:[120, 132, 101, 134, 90, 230, 210]
          	},
          	{
	            name:'金融机构各项存款',
	            type:'line',
	            stack: '总量',
	            lineStyle:{
	               	normal:{
	                	color:"#52ffff"
	               	}
	            },
	            areaStyle: {
	            	normal: {
			            color:{
				          	type: 'linear',
				          	x: 1,
				          	y: 0,
				          	x2: 1,
				          	y2: 1,
				          	colorStops: [
					          	{
					              	offset: 0, color: 'rgba(82, 255, 255, 1)' // 0% 处的颜色
					          	}, 
					          	{
					              	offset: 1, color: 'rgba(82, 255, 255, 0)' // 100% 处的颜色
					          	}
			      			],
				          	globalCoord: false // 缺省为 false
				      	}
		              
	              	}
          		},
	            data:[120, 132, 101, 134, 90, 230, 210]
          	},
          	{
	            name:'金融机构各项贷款',
	            type:'line',
	            stack: '总量',
	            lineStyle:{
	               	normal:{
	                	color:"#ff6901"
	               	}
	            },
	            areaStyle: {
	            	normal: {
			            color:{
				          	type: 'linear',
				          	x: 1,
				          	y: 0,
				          	x2: 1,
				          	y2: 1,
				          	colorStops: [
					          	{
					              	offset: 0, color: 'rgba(255, 105, 1, 1)' // 0% 处的颜色
					          	}, 
					          	{
					              	offset: 1, color: 'rgba(255, 105, 1, 0)' // 100% 处的颜色
					          	}
			      			],
				          	globalCoord: false // 缺省为 false
				      	}
		              
	              	}
          		},
	            data:[120, 132, 101, 134, 90, 230, 210]
          	}
	    ]
	  };
	czChart.setOption(czOption);

	window.chartList.push(czChart);

	function refreshCharts(charts){
		charts = charts || window.chartList;

		for(var i=0; i<charts.length; i++){
			var chart = charts[i];

			var option = chart.getOption(),
				dom    = chart.getDom();

			chart.dispose();
			charts[i] = echarts.init(dom);
			charts[i].setOption(option);
		}
	}

	window.refreshCharts = refreshCharts;


	function slideMenu(){

		var $menus = $('.box-line');

		$.each($menus, function(i, v){
			var $menu = $(v),
				top   = $menu.css('top').split('p')[0];

			$menu.animate({
				top : top - 70 + 'px'
			}, 500, function(){
				if(top - 70 == -70){
					$menu.css('top', '140px');
				}
			});
		});

	}

	setInterval(slideMenu, 5000);

	//电子表效果
	(function(){
		function watch(){
            var aImg = document.getElementsByClassName("timeNum");  /* 获取显示时间的img节点 */
            var shockNum = [ -15, 15, -9, 9, -4, 0];                /* 振幅的数组 */
            var iNow = [];                                            /* 存储每次需要波动的节点下标 */
            
            /* 初始化电子表 */
            time();    
            /* 设置定时器更新时间（1s） */
            var timer = setInterval(function(){        
                time();
            },1000);    
            /* 获取时间方法 */    
            function time(){
                var dateNow = new Date();                /* new一个Date对象 */
                var hours = dateNow.getHours();            /* 时 */
                var minius = dateNow.getMinutes();        /* 分 */
                var seconds = dateNow.getSeconds();        /* 秒 */
                var str = timeStyle(hours)+timeStyle(minius)+timeStyle(seconds); /* 用字符串存储当前时间 */
                /* 通过str初始化时间表 */
                for (var i=0; i<str.length; i++) {
                    /* 判断每次是哪个需要波动 */
                    if (aImg[i].index != str.charAt(i)) {
                        /* 首次循环index值全为undefined，禁止全部波动 */
                        if (aImg[i].index != undefined) {                    
                            iNow.push(i);        /* 把需要波动的值加入iNow数组 */
                        }
                        aImg[i].index = str.charAt(i);  /* 并赋给新的值 */    
                        aImg[i].innerText = str.charAt(i);
                    }        
                }
                /* 遍历当前需要震动的数组，并设置震动定时器 */
                for(x in iNow){
                    toshocking(iNow[x]);
                }
                /* 每次震动完数组清零 */
                iNow.length = 0;
            }    
            
            /* 为每一个需要震动的数字设置震动定时器 */
            function toshocking(z){
                var n = 0;   /* 波动次数 */
                var timer2 = setInterval(function(){
                    aImg[z].style.top = shockNum[n]+"px";
                    ++n;   
                    /* 若波动完设置的振幅数组，清除定时器 */
                    if (n==shockNum.length) {
                        clearInterval(timer2)
                    }                    
                },20);            
            }
            
            // 调整时间的样式，个位数前面加“0”
            function timeStyle(num){
                if (num < 10) {
                    return "0"+num;
                }
                return num+"";
            }
        }

        watch();
	})()

}); 