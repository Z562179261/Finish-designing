import type { IData } from "../type/index";
import * as echarts from 'echarts';
import axios from "axios";
import chinaJson from "../assets/china.json";


type EChartsOption = echarts.EChartsOption



class InteData implements IData {
    areaTree: any[] = []
    showList: any[] = []
    chinaDayList: any[] = []
    chinaTotal: any[any] = []
    china: any[] = []
    hbData: any[any] = []
    mapType: number = 1
    lineType: number = 1
    lastUpdateTime: string = ''
    name: string = ''
    type: number = 1
    isScroll: Boolean = true
}

const getPageList = (list: any[]) => {
    const arr: Array<any[]>[] = [];
    for (let index = 0; index < list.length; index += 30) {
        arr.push(list.slice(index, index + 30))
    }
    return arr
}

const initDataFun = async (data: InteData) => {
    var mapDom: HTMLElement | null = document.getElementById("map");
    var mapDom2: HTMLElement | null = document.getElementById("map2");
    var lineDom: HTMLElement | null = document.getElementById("line");
    var lineDom1: HTMLElement | null = document.getElementById("line1");
    var lineDom2: HTMLElement | null = document.getElementById("line2");
    var optionMap: EChartsOption = {
        title: {//标题内容
            // text: '中国疫情图',
            subtext: "单击省份可查看病例数",
        },
        tooltip: {//提示框组件
            trigger: "item",//触发类型 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
            formatter: "现有确诊病例<br/>{b}: {c} ",//提示框浮层内容格式器，支持字符串模板和回调函数两种形式
            //  模板变量有 { a }, { b }，{ c }，{ d }，{ e }，分别表示系列名，数据名，数据值等。 在 trigger 为 'axis' 的时候，会有多个系列的数据，此时可以通过 { a0 }, { a1 }, { a2 } 这种后面加索引的方式表示系列的索引。 不同图表类型下的 { a }，{ b }，{ c }，{ d } 含义不一样。 其中变量{ a }, { b }, { c }, { d } 在不同图表类型下代表数据含义为：

            // 折线（区域）图、柱状（条形）图、K线图: { a }（系列名称），{ b }（类目值），{ c }（数值）, { d }（无）

            // 散点图（气泡）图: { a }（系列名称），{ b }（数据名称），{ c }（数值数组）, { d }（无）

            // 地图: { a }（系列名称），{ b }（区域名称），{ c }（合并数值）, { d }（无）

            // 饼图、仪表盘、漏斗图: { a }（系列名称），{ b }（数据项名称），{ c }（数值）, { d }（百分比）

        },
        visualMap: {
            show: false,
        },
    };


    var series = {
        type: "map",//
        map: "china",
        colorBy: "series",//按照系列分配调色盘中的颜色，同一系列中的所有数据都是用相同的颜色
        zoom: 1.3,//当前视角的缩放比例
        top: 80,//组件离容器上侧的距离
        label: {
            show: true,
            color: "#333",
            fontSize: 10,
        },
    }

    var myMap = echarts.init((mapDom as HTMLElement))
    var myMap2 = echarts.init((mapDom2 as HTMLElement))
    var myLine = echarts.init(lineDom as HTMLElement);
    var myLin1 = echarts.init(lineDom1 as HTMLElement);
    var myLin2 = echarts.init(lineDom2 as HTMLElement);
    echarts.registerMap("china", (chinaJson as any))

    myMap.showLoading()
    let res = await axios("/api/ug/api/wuhan/app/data/list-total?t=330415245809")
    // let res = await axios("http://127.0.0.1:81")
    // let res = await axios("https://c.m.163.com/ug/api/wuhan/app/data/list-total?t=330415245809")

    console.log(res);
    // data.areaTree = res.data.data.areaTree;
    //结构 [[1-30],[31-60],....]
    data.areaTree = getPageList(res.data.data.areaTree)
    data.showList = data.areaTree[0]
    // console.log('data.areaTree==', data.areaTree);

    data.chinaDayList = res.data.data.chinaDayList;
    data.chinaTotal = res.data.data.chinaTotal;
    data.china = res.data.data.areaTree.find((v: any) => v.id === "0").children;
    data.hbData = data.china.find((v) => v.id === "420000");
    // console.log(data.hbData);
    let mapData: any[] = [],
        mapData2: any[] = [],
        lineData: {
            date: any[],
            confirm: any[],
            suspect: any[],
            heal: any[],
            dead: any[],
            storeConfirm: any[],
            store: any[],
        } = {
            date: [],
            confirm: [],
            suspect: [],
            heal: [],
            dead: [],
            storeConfirm: [],
            store: [],
        };

    data.china.map((v: any) => {
        mapData.push({
            name: v.name,
            value: v.total.confirm - v.total.dead - v.total.heal || 0,
        })
        mapData2.push({
            name: v.name,
            value: v.total.confirm,
        })
    })

    data.chinaDayList.map((v: any) => {
        lineData.date.push(v.date);
        lineData.confirm.push(v.total.confirm);
        lineData.suspect.push(v.total.suspect);
        lineData.heal.push(v.total.heal);
        lineData.dead.push(v.total.dead);
        lineData.store.push(v.total.confirm - v.total.dead - v.total.heal);
        lineData.storeConfirm.push(v.total.confirm);
    });

    myMap.hideLoading()
    myMap.setOption({
        ...optionMap,
        series: {
            ...series,
            data: mapData
        }
    })
    myMap2.setOption({
        ...optionMap,
        series: {
            ...series,
            data: mapData2
        }
    })
    var optionLine = {
        title: {
            text: "全国疫情新增趋势",
            subtext: "单击可查看具体数据",
        },
        tooltip: {
            trigger: "axis",//坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
            // formatter: "现有确诊病例<br/>{b}: {c} ",
        },
        grid: {
            top: "18%",
            left: "18%", //原来是10%，修改为20%
            right: "2%",
        },
        xAxis: [
            {
                type: "category",
                // axisTick: {
                //     alignWithLabel: true,
                // },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: "#a9a9a9",
                    },
                },
                axisPointer: {
                    label: {
                        formatter: function (p: any) {
                            return `确诊： ${p.seriesData[0].data}`;
                        },
                    },
                },
                data: lineData.date,
            },
            {
                show: false,
                type: "category",
                // axisTick: {
                //     alignWithLabel: true,
                // },
                axisLine: {
                    onZero: false,
                    color: '#a9a9a9'
                },
                axisPointer: {
                    label: {
                        formatter: function (p: any) {
                            return `疑似： ${p.seriesData[0].data}`;
                        },
                    },
                },
            },
        ],
        yAxis: [
            {
                type: "value",
                //  axisLine: {
                //   // onZero: false,
                //   interval: 0,//使x轴文字显示全
                //   //  rotate:40
                //   // lineStyle: {
                //   //   color: colors[1],
                //   // },
                // },
            },
        ],
    };
    myLine.setOption({
        ...optionLine,
        series: [
            {
                type: "line",//
                xAxisIndex: 0,
                itemStyle: {
                    normal: {
                        color: "#e44a3d",
                        lineStyle: {
                            color: "#e44a3d",
                        },
                    },
                },
                data: lineData.confirm,
            },
            {
                type: "line",
                xAxisIndex: 1,

                itemStyle: {
                    normal: {
                        color: "#a31d13",
                        lineStyle: {
                            color: "#a31d13",
                        },
                    },
                },
                // smooth: true,
                // emphasis: {
                //   focus: 'series'
                // },
                data: lineData.suspect,
            },
        ],
    });
    optionLine.title.text = "全国疫情确诊数据";
    myLin1.setOption({
        ...optionLine,
        series: [
            {
                type: "line",
                xAxisIndex: 0,
                itemStyle: {
                    normal: {
                        color: "#a31d13",
                        lineStyle: {
                            color: "#a31d13",
                        },
                    },
                },
                data: lineData.storeConfirm,
            },
            {
                type: "line",
                xAxisIndex: 1,
                itemStyle: {
                    normal: {
                        color: "#ffa352",
                        lineStyle: {
                            color: "#ffa352",
                        },
                    },
                },
                data: lineData.store,
            },
        ],
    });
    optionLine.title.text = "全国疫情治愈数据";
    myLin2.setOption({
        ...optionLine,
        series: [
            {
                type: "line",
                xAxisIndex: 0,
                data: lineData.heal,
            },
            {
                type: "line",
                xAxisIndex: 1,
                // smooth: true,
                // emphasis: {
                //   focus: 'series'
                // },
                data: lineData.dead,
            },
        ],
    });

}


export {
    InteData,
    initDataFun
}
