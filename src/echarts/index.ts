import * as echarts from "echarts"
export default function generate(doc: HTMLElement, result: any[]) {
    let data: any = [];
    let arr = result

    for(let j =0;j<arr.length -1;j++){
        for (let i = 0; i < arr.length -j- 1; i++) {
        if (arr[i].number < arr[i + 1].number) {
            var temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
        }
    }
    }

    arr.forEach((el: any) => {
        let str = el.region + '--' + el.name
        data.push({
            "名称": str,
            "面积数值_BA_2": el.number
        })

    });
    let myChart = echarts.init(doc);
    var orgOptions = {
        "keys": [{
            "col": "名称",
            "Merge": false,
            "colType": "varchar2",
            "display": true,
            "merge": false,
            "values": [],
            "alias": "名称",
            "id": "e9457763-c257-4abc-8ecc-1278cb3ac3c6",
            "sortable": false,
            "type": "eq"
        }],
        "values": [{
            "cols": [{
                "col": "面积数值_BA_2",
                "colDataType": "NUMBER",
                "expCalFormulaReplace": "",
                "series": {
                    "Insideoption": {
                        "valuetype": "5",
                        "valueStyle": {
                            "fontFamily": "sans-serif",
                            "color": "#000000",
                            "fontSize": "12",
                            "fontStyle": "normal",
                            "fontWeight": "normal"
                        },
                        "text": "",
                        "textStyle": {
                            "fontFamily": "sans-serif",
                            "color": "#000000",
                            "fontSize": "12",
                            "fontStyle": "normal",
                            "fontWeight": "normal"
                        },
                        "type": "1"
                    },
                    "animationDelayTime": "",
                    "percentile": false,
                    "lineStyle": {
                        "type": "solid"
                    },
                    "tooltip": {
                        "show": true
                    },
                    "symbolShow": true,
                    "label": {
                        "normal": {
                            "show": false,
                            "textStyle": {
                                "fontFamily": "sans-serif",
                                "color": "#000000",
                                "fontSize": "12",
                                "fontStyle": "normal",
                                "fontWeight": "normal"
                            }
                        }
                    },
                    "symbolNotShow": false,
                    "decimaldigits": 0
                },
                "seriesType": "bar",
                "display": true,
                "expCalFormula": "",
                "width": 0,
                "alias": "面积数值",
                "sortable": false,
                "aggregate_type": "sum",
                "decimaldigits": 0
            }],
        }],
        "option": {
            "BAMetaAttributes": {
                "xuhaofontsize": 16,
                "leftpadding": 30,
                "attrname": "件(数量)",
                "rightpadding": 70,
                "xuhaorightpadding": 50,
                "showxuhao": "1"
            },
        }
    }

    var attrname = orgOptions.option.BAMetaAttributes.attrname ? orgOptions.option.BAMetaAttributes.attrname : '';
    var leftpadding = orgOptions.option.BAMetaAttributes.leftpadding != null ? orgOptions.option.BAMetaAttributes
        .leftpadding : 10;
    var xuhaofontsize = orgOptions.option.BAMetaAttributes.xuhaofontsize != null ? orgOptions.option.BAMetaAttributes
        .xuhaofontsize : 28;
    var rightpadding = orgOptions.option.BAMetaAttributes.rightpadding != null ? orgOptions.option.BAMetaAttributes
        .rightpadding : 60;
    var xuhaorightpadding = orgOptions.option.BAMetaAttributes.xuhaorightpadding != null ? orgOptions.option
        .BAMetaAttributes.xuhaorightpadding : 0;
    var showxuhao = orgOptions.option.BAMetaAttributes.showxuhao == "1" ? true : false;


    var h1keyName = orgOptions.keys[0].col;
    var z1keyName = orgOptions.values[0].cols[0].col;

    var dataSource: any = [];
    var dataSourcebg: any = [];
    var maxNum = 0;
    for (let index = 0; index < data.length; index++) {
        const element: any = data[index];
        let tempitem = {
            value: element[z1keyName],
            name: element[h1keyName],
            xuhao: index + 1,
        }
        dataSource.push(tempitem);
        dataSourcebg.push(100);
        if (element[z1keyName] > maxNum) {
            maxNum = element[z1keyName];
        }
    }
    var maxArr = data.map((item: any) => maxNum);

    const img1 =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAyCAYAAAAnWDnqAAAAAXNSR0IArs4c6QAAAt5JREFUaEPtmj1oFEEYhp/vjD9nEklhY5EUIgp2ooVaaW+jjXYKglaKJCgH/mEQCYKnJigqCGkEbWJjEdJopRaKhRAQxEILLVKImktikv1kJpNLuLvo7uyOOWW/5rjdvZln33lvjvveFTIunWIrs/QjTFOgR1YzmuUUktVg+o31tHAJOAa0uHFngHvMcFHWMZbFXKmBVVnFBCeAc0AHMAs8AlYCB4AVwFfgMkUGRPiZBjwVsFbYD1wFNjmI58ANlA/2vbAROAXsduffA2dkLY99ob2AdZxtCGVgj5vYABpQA1xfYoENuLkBU89QuqWVN0nBEwHrOBvs0gpHgIJb6rvAEGqtsHSJtYaxyHFnnQhl0FhJWvkcFzwWsCpFJulGKQFtwLT1qXCfiO9xJ7PXFWhHOQocdD7/AfRS5GYcf/8WWBVhgkNAH9DlwJ6i9AOfEoHWX9yJcBLYm8TfSwJrhZ3AdbCvpt6h1revU4LWfnw7Qg+wOY6/64B1gi7UKmqUNefHUG4DT4AoY9i54RL4uwqsShsVSgjdQBGYQnlAgUEiKkFAawdt5G+hjzWUxZjT3Jv16SSHUa6A3QXMkREiBoAvfwX0z/7+CJQo8lC0wouqT4W3QJnIvjZDGX+bFd/iYF4aYHU+OkvEiFW4ucrs9/sQLsxZYh5Y2dFcnDU0wqscOOgK5QoHldf+uOQeDqtxrnBYfXMPh9Y3VzhXuE6BfFsLbYpc4Vzh/B9HaA/8hwr3Bm1H+S9I3d/8hUZKuIafL26DRkrYlqovaG0rdqFVNT9ipk1rX8w4zcDasRvEAs3Zbm0AboKXW8Audy5MQzthYLN8kYFnJLYcoUwHapMkr9AxFnD1i5ku9jLJqEmOTILUDnjFuomAF4H7BIungU7Xix72Dc69gKvgSaNbZRSlR9oY9t35UgGbSZcIx4cc0GKfnqfIHRFrBe9KDVxV+195/KBu/zYPeERcs8cDPODxC0lMg5hwur7YAAAAAElFTkSuQmCC';
    const img2 =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAyCAYAAAAnWDnqAAAAAXNSR0IArs4c6QAAAxFJREFUaEPtmjFoE2EUx//vfZ4SsNDBxSH2EgMBO4kO4mQGty7tUkdB0MlSWiwdikXpUBRLsVCwIhRc7FIXh27qUh0UpxYCJVyTwaVDQTFgvO/JV75KiNc0yd21Ddy3Hd/dez/++X/vyHtHiHhtb29f8n3/mYhURWQil8ttRZmCogpWLBbPOY7zCMBdAKds3N8AFohoJpPJ7EaRKzTwxsbG6VQqdR/AFIBeAD6AVQBnAAwAYAA7IjJdLpeXCoXCnzDgoYA9zxvUWj8BkDMQRLQuIvNa65K9zhPRGIAr5lpENpl5PJPJrHUK3RGw9ek8gJs2sQE0oOtBIMxcADACIG3315RS4319fZvtgrcFHODTXRF5QUSrWmtjhQOXUsrRWg8T0R0APQCMNZZqtdp0Pp/faRW8JeAgnxLRCoCXvu//aDWZtUkvEd0DMARAATCHcaZarS709/ebQ9p0HQp8mE8PS3DQPjNniWhURK7be7aYecJ13bfNYh4I7HneZa31HIAbrfg0BLgBHgWQtTE+MPOY67rfgmL+B+x53nkRmRGR27YktezTENBKRIasVUxp1ES0TERTrut+r4/7D7hSqaRqtZopQZMAzgKoAVgholft+rRTcKVUj4iYQzkMwAHwE8Cs4zhz6XS6uncGRIRKpdItIpoFcMHWy/fM/Nz3/UqnycM8p5RKa61HiMiUQ7PKIjKZzWbfGNhPAK7ZjSKAOa311zAJo3qWmc0Lx/zqeRvzowEWq+pjAO9EREeVMIo4RGRe7QNE9HDPEvvAWuurUSSIKwYzf0mA41LXxE0UjlPdROG41U0UThQOUCApa3HbIlE4UbhBgcQSiSUSS8TtgUTh41ZYRLrmb343NVI+d1+rat+KQc1AInotIsta619HYdmWmoGNIAHtVjMBWoyzjcXM7bdbA8AbG9qxNAqZOVxDOwB8UESeishF2zSMpBUb+cigHjzKZjcRxTuUqQcPM0440rFXC/4+mYPFIH83G90qpXIi8uDYR7f14E2G4+a2/eHhyRiO14N3zecHjTaJ+wOPvxF8nWDb371gAAAAAElFTkSuQmCC';
    const img3 =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAyCAYAAAAnWDnqAAAAAXNSR0IArs4c6QAAA5tJREFUaEPtmU9oVFcUxn/ffZkEq4ILF3VRF6UguJORiXWlrt3UjUI3AaGFQlsZiyQ11GmdJqF/RjEgVCi4KbQbu+lC3FRcNG1M2oIQKIiLdtEushDaaifOu6fcmYmtmclk5s08FXl3NY8775zfO++793HPJwY8bGp0d4x9inE/ctEpTczdHmQKDSqYfZLfHleH3kf2GjDUjLti0uxQtVpW6ee7g8jVN7CVdg/73OY3TZoEtgExcAVsBHQYcBjLcnbGVTdfUul6rR/wvoBr04VXMD4CXqpDiO+A8x7dCZfO2y6JokE+XBssITuZm7h5NSl0IuCV6b17nKkCOtBMfEfG+dgpALeMyDho2FvAC83JqxE6qXd/WOoVvCfghk6js4igUwfcNeMzM3+FKApSWH/E5OT8UaHjwFaghulSNFI7o3cWl7sF7wq4jU4fIH1l6HPD/uw2WV013m+T9DpwBIjCQ8us7B78PavS0spGsTYEbtGpcQNxzku/bRS807zDXgROYOxv/u824tTQxPzXne5bF7hXnSaFj7ztN3ECCA8QluZ1LysOTyz81C5mC7B9mN8Ru6iMMdazTpNSx3EkuSMSQSpha/SIy5GPJ3V68ff/h30IbJWXN/lqXDRjHNgCJNZpUm6hrcKOY3YUyAF/Scy4kaii4tz9+howQ/FM4RjGDLCzmexb4EK/Ok0K7szC9he2wYPNGL8ixqPx+S9Vmy7MYeyrq0f84lAlhsWkyQZ5XwR5jxVl7GrImxuqTRWs8ds+MPFN+D4NMmn/sbyTcVjovbokVoG9tLf/4OlFcGYLGXB69YWswmlWN8TOKpxVeE0FMklkksgkkbYGsgpnFe5cgWwfTlshWYWzCj9z+7DgdOy5RqT6sf/pGWuO+fFU4UeDPfUjNHbLjIp37tbTANzSSBHfy0q4ODc6hqwM7Gh09rmGMeud/ngS4M7b84gicKiZ/79W1SqQlQ5sqeXujQdPAtgEVBFfmHHZpHuPA1xmz0mMYbwKjLRtBq4FsZn8zthHoTF4rKESlk12Md02VlOnpjcQ27tqt64FXymP7nORnUu7UdhOpz72bw9PLsy3e6sdLYM0W7EdW6rhva4zNvQ4wn2DbHZ307TutF66An64MPuxE3qwBQYGvBqorWEjPo7RzXbJejVeBg68GrDFEoNHrIak1lZqwHV9t5rjdTMHC+Z4MvMwVeAO+g5TiezZxwLcRt//JDXAOwH/C2NeWG8WRbglAAAAAElFTkSuQmCC';
    const img4 =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAyCAYAAAAnWDnqAAAAAXNSR0IArs4c6QAAAt9JREFUaEPtmj9oFEEUxn/vEpVAAgHTpDCFiIKdaKFW2ttooekUBGMURS4oAeO/EOQIeGpCLjlBSCMYi9hYhDRaqYViIQQEsdBCBQVBUWLiPpm9OXLsnZu72d0YZac5lmW++e233wzceyvEPSZ0Kx7XfNkMfRyXuTiXkNjEitqBxxWUY0Cz1V1EuEWGS/TIpzjWig58T9fymVMoA0A78AuYtnAHgCbgC8IFPjLBZVmMAh4NeFz3owwDmyzEY+AG8MZebwTOALvt9RxKHydlxhXaDXhct6HkgT12YQNoQA1wrWGAzwIb7M0Z13w3BlzUThYZQjjibynzqqGIMI36UQgba4BDwFGgDXDKd33AeW1hHVmEfqAVWACmEG6jfG3o9Xq0k6EHqMz3EOsZ5aD8XE4rHFhVKNCNkAO6rNhDYAR4t5z4MveD+X6NcI5euR8278/AJqceYwi7rMAr8HP7PCJocLrJt9mY5gHMeISQpVde1FqnGrg6p+b8LKA8QPBihi3JCU2oHxETFXM0eiiTNDNAj7yvXHMJOM6cuj6V0Ib6m9JsTrNJv6HkmCdPVn6Uni3ZnLqim+PvNLDXCrxF6ecEd4WCPgF2JpxTV/DtQBbYYgWeGmC1F4OJ5tQVWckg7AMuliKxBLzDVXOF5j1LgRN2OnU4YYNJHU4dDjiQRiKNRBqJpDOQOpw6HO5Aeg4nnZDU4dTh/+4cPk+GWb9ItJpGjb/5S4UU4SUeeczv6hg1CimlUtVhhKtAJ/gOzwKjwIe/xB1SqioTjWkrGfpRvzTUAsyj3EGYBL6vCHhdxcAgSVG78MihdPuVIVil5dYgeEFNgfD6ChQKTU77gM0WocGCdiV4sqXYYE4jtgwqweMsdtfKKQzSwc3oTZnqfLu3vRpoC4Rt8PraXkEFt8Zi3Y2X+IHLio23buvKaXLARrl2c3zKNlWcmofJApfV/5nPD4J2mA88lBGUBdcGeJjDvwEuqGXYEDGELgAAAABJRU5ErkJggg==';

    //
    myChart.setOption({


        dataZoom: [
            {
                type: "slider",
                show: true,//隐藏或显示（true）组件
                backgroundColor: "rgb(255, 255, 255)", // 组件的背景颜色。
                fillerColor: "rgb(0, 0, 255)", // 选中范围的填充颜色。
                borderColor: "rgb(19, 63, 100)", // 边框颜色
                showDetail: false, //是否显示detail，即拖拽时候显示详细数值信息
                startValue: 0, // 数据窗口范围的起始数值
                endValue: 5, // 数据窗口范围的结束数值（一页显示多少条数据）
                yAxisIndex: [0, 1],//控制哪个轴，如果是 number 表示控制一个轴，如果是 Array 表示控制多个轴。此处控制第二根轴
                filterMode: "empty",
                width: 8, //滚动条高度
                height: "80%", //滚动条显示位置
                right: 0, // 距离右边
                handleSize: 0,//控制手柄的尺寸
                zoomLoxk: true, // 是否锁定选择区域（或叫做数据窗口）的大小
                top: "middle",
            },
            {
                //没有下面这块的话，只能拖动滚动条，鼠标滚轮在区域内不能控制外部滚动条
                type: "inside",
                yAxisIndex: [0, 1],//控制哪个轴，如果是 number 表示控制一个轴，如果是 Array 表示控制多个轴。此处控制第二根轴
                zoomOnMouseWheel: false, //滚轮是否触发缩放
                moveOnMouseMove: true, //鼠标移动能否触发平移
                moveOnMouseWheel: true,//鼠标滚轮能否触发平移
            },
        ],
        backgroundColor: '#4E657A',
        grid: [{
            left: leftpadding,
            top: 13,
            right: rightpadding,
            bottom: 2,
            containLabel: true,
        },],
        xAxis: [{
            gridIndex: 0,
            type: 'value',
            axisLabel: {
                show: false
            },
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
        },
        {
            gridIndex: 0,
            type: 'value',
            max: 100,
            axisLabel: {
                show: false
            },
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
        },
        ],
        yAxis: [{
            gridIndex: 0,
            type: 'category',
            inverse: true,
            position: 'left',
            data: dataSource.map((item: any) => item.name),
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: showxuhao,
                width: xuhaofontsize * 2.5,
                padding: [0, 0, 20, -95 + xuhaorightpadding],
                align: 'left',
                formatter: (name: any, index: any) => {
                    let tempValue;
                    for (var i = 0; i < dataSource.length; i++) {
                        if (dataSource[i].name === name) {
                            tempValue = dataSource[i].xuhao;
                        }
                    }

                    const id = tempValue;
                    if (id < 4) {
                        return `{icon${id}|${id}}`;
                    } else {
                        return `{count|${id}}`;
                    }
                },
                rich: {
                    icon1: {
                        width: xuhaofontsize * 1.5,
                        height: xuhaofontsize * 1.5,
                        align: 'center',
                        padding: [0, 0, 2, 0],
                        backgroundColor: {
                            image: img1,
                        },
                        color: '#ffffff',
                        fontSize: xuhaofontsize,
                    },
                    icon2: {
                        width: xuhaofontsize * 1.5,
                        height: xuhaofontsize * 1.5,
                        padding: [0, 0, 2, 0],
                        align: 'center',
                        backgroundColor: {
                            image: img2,
                        },
                        color: '#ffffff',
                        fontSize: xuhaofontsize,
                    },
                    icon3: {
                        width: xuhaofontsize * 1.5,
                        height: xuhaofontsize * 1.5,
                        padding: [0, 0, 2, 0],
                        align: 'center',
                        backgroundColor: {
                            image: img3,
                        },
                        color: '#ffffff',
                        fontSize: xuhaofontsize,
                    },
                    count: {
                        width: xuhaofontsize * 1.5,
                        height: xuhaofontsize * 1.5,
                        padding: [0, 0, 2, 0],
                        align: 'center',
                        backgroundColor: {
                            image: img4,
                        },
                        color: '#ffffff',
                        fontSize: xuhaofontsize,
                    }
                },
            },
        },],

        series: [{
            name: '背景',
            type: 'bar',
            barWidth: 10,
            barGap: '-100%',
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: dataSource,
            itemStyle: {
                normal: {
                    color: '#02BAF433',
                    barBorderRadius: [30, 30, 30, 30],
                },
            },
            label: {
                show: true,
                offset: [6, 0],
                color: "#64DFA2",
                fontSize: 16,
                fontWeight: 500,
                position: 'right',
                align: 'left',
                formatter: function (params: any) {
                    let tempValue;
                    for (var i = 0; i < dataSource.length; i++) {
                        if (dataSource[i].name === params.name) {
                            tempValue = dataSource[i].value;
                        }
                    }
                    return tempValue + attrname;
                }
            }
        },
        {
            type: 'bar',
            xAxisIndex: 0,
            yAxisIndex: 0,
            barWidth: 10,
            data: dataSource,
            silent: true,
            label: {
                show: true,
                offset: [6, -18],
                color: '#fff',
                fontSize: 16,
                fontWeight: 500,
                position: 'left',
                align: 'left',
                formatter: function (params: any) {
                    return params.data.name;
                }
            },
            itemStyle: {
                emphasis: {},
                normal: {
                    color: "#64DFA2",
                },
            },

        },

        ],
    })

}