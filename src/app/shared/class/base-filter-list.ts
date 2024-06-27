import { Observable } from "rxjs";

export class BaseFilterList {
    filterList(list: Observable<any[]>): any[] {
        if (list) {
            let tmpList: any[] = [];

            list.forEach(data => {
                data.forEach(d => {
                    if (d.status == 1)
                        tmpList.push(d)
                })
            });

            //console.log(tmpList)
            return tmpList
        }
        return [];
    }

    toList(list: Observable<any[]>): any[]{
        if (list){
            let tmpList: any[] = [];
            list.forEach(data => {
                data.forEach(d => {
                    tmpList.push(d)
                })
            })
            return tmpList;
        }
        return [];
    }
}