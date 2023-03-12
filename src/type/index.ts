interface IData {
    areaTree: any[],
    showList: any[],
    chinaDayList: any[],
    chinaTotal: any[],
    china: any[],
    hbData: any,
    type: number,
    mapType: number,
    lineType: number,
    lastUpdateTime: string,
    isScroll: Boolean
}
// interface IToday {
//     confirm: number | null,
//     dead: number | null,
//     heal: number | null,
//     input: number | null,
//     severe?: number | null,
//     suspect?: number | null,
//     storeConfirm?: number | null
// }

// interface IAreaTree {
//     id: string,
//     lastUpdateTime: string,
//     overseaLastUpdateTime?: string,
//     name?: string,
//     extData?: {
//         incrNoSymptom?: number,
//         noSymptom?: number
//     } | null,
//     today: IToday,
//     total: IToday,
//     date?: string | null,
//     children: IAreaTree[] | []
// }


export type {
    IData,
}






