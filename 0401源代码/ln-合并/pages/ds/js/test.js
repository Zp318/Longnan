var geoCoordMap = {
        '长春': [125.8154, 44.2584],
        '长沙': [113.0823, 28.2568],
        '贵阳': [106.6992, 26.7682],
        '西安': [109.1162, 34.2004],
        '深圳': [114.5435, 22.5439],
        '济南': [117.1582, 36.8701],
        '海口': [110.3893, 19.8516],
        '沈阳': [123.1238, 42.1216],
        '武汉': [114.3896, 30.6628],
        '昆明': [102.9199, 25.4663],
        '杭州': [119.5313, 29.8773],
        '成都': [103.9526, 30.7617],
        '拉萨': [91.1865, 30.1465],
        '天津': [117.4219, 39.4189],
        '合肥': [117.29, 32.0581],
        '呼和浩特': [111.4124, 40.4901],
        '哈尔滨': [127.9688, 45.368],
        '北京': [116.4551, 40.2539],
        '南京': [118.8062, 31.9208],
        '南宁': [108.479, 23.1152],
        '南昌': [116.0046, 28.6633],
        '乌鲁木齐': [87.9236, 43.5883],
        '上海': [121.4648, 31.2891]
    };

    var data = [{
        name: '长春',
        value: 90
    }, {
        name: '长沙',
        value: 10
    }, {
        name: '贵阳',
        value: 20
    }, {
        name: '西安',
        value: 20
    }, {
        name: '深圳',
        value: 20
    }, {
        name: '济南',
        value: 50
    }, {
        name: '海口',
        value: 58
    }, {
        name: '沈阳',
        value: 64
    }, {
        name: '武汉',
        value: 68
    }, {
        name: '昆明',
        value: 45
    }, {
        name: '杭州',
        value: 68
    }, {
        name: '成都',
        value: 49
    }, {
        name: '拉萨',
        value: 66
    }, {
        name: '天津',
        value: 86
    }, {
        name: '合肥',
        value: 58
    }, {
        name: '呼和浩特',
        value: 59
    }, {
        name: '哈尔滨',
        value: 95
    }, {
        name: '北京',
        value: 68
    }, {
        name: '南京',
        value: 56
    }, {
        name: '南宁',
        value: 89
    }, {
        name: '南昌',
        value: 48
    }, {
        name: '乌鲁木齐',
        value: 49
    }, {
        name: '上海',
        value: 78
    }];

    function formtGCData(geoData, data, srcNam, dest) {
        var tGeoDt = [];
        if (dest) {
            for (var i = 0, len = data.length; i < len; i++) {
                if (srcNam != data[i].name) {
                    tGeoDt.push({
                        coords: [geoData[srcNam], geoData[data[i].name]]
                    });
                }
            }
        } else {
            for (var i = 0, len = data.length; i < len; i++) {
                if (srcNam != data[i].name) {
                    tGeoDt.push({
                        coords: [geoData[data[i].name], geoData[srcNam]]
                    });
                }
            }
        }
        return tGeoDt;
    }

    function formtVData(geoData, data, srcNam) {
        var tGeoDt = [];
        for (var i = 0, len = data.length; i < len; i++) {
            var tNam = data[i].name
            if (srcNam != tNam) {
                tGeoDt.push({
                    name: tNam,
                    value: geoData[tNam]
                });
            }

        }
        tGeoDt.push({
            name: srcNam,
            value: geoData[srcNam],
            symbolSize: 8,
            itemStyle: {
                normal: {
                    color: 'red',
                    borderColor: '#000'
                }
            }
        });
        return tGeoDt;
    }

    //var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
    var planePath = 'arrow';

option = {
    backgroundColor: '#404a59',
    title: {
        text: '格式化数据的简单迁徙图',
        left: '5',
        top: '10px',
        itemStyle: {
            normal: {
                borderColor: 'rgba(100,149,237,1)',
                borderWidth: 0.5,
                areaStyle: {
                    color: '#1b1b1b'
                }
            }
        }
    },
    tooltip: {
        trigger: 'item',
    },
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true,
        silent: true,
        itemStyle: {
            normal: {
                areaColor: '#37376e',
                borderColor: '#000'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
    },
    series: [{

            type: 'lines',
            zlevel: 2,
            effect: {
                show: true,
                period: 6,
                trailLength: 0.1,
                color: '#db9982',
                symbol: planePath,
                symbolSize: 8
            },
            lineStyle: {
                normal: {
                    color: '#a6c84c',
                    width: 1,
                    opacity: 0.4,
                    curveness: 0.2
                }
            },
            data: formtGCData(geoCoordMap, data, '长沙', true)
        },
            {

                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.1,
                    color: 'maroon',
                    symbol: planePath,
                    symbolSize: 8
                },
                lineStyle: {
                    normal: {
                        color: '#a6c84c',
                        width: 1,
                        opacity: 0.4,
                        curveness: 0.2
                    }
                },
                data: formtGCData(geoCoordMap, data, '长沙', false)
            },
            {

                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    period: 4,
                    scale: 2.5,
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                symbolSize: 5,
                itemStyle: {
                    normal: {
                        color: '#0D6695',
                        borderColor: 'gold'
                    }
                },

                data: formtVData(geoCoordMap, data, '长沙')
            }]
};