export class Stock {
    constructor(
        public id:number = 0,
        public itemNo: string = '',
        public category: string ='',
        public buyPrice:string = '',
        public sellPrice:string = '',
        public date: string ='',
        public warrenty: boolean = false,
        public warrentyDateEnd: string = '',
        public sold:boolean = false
    ){}
}