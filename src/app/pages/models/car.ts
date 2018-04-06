import { Customer } from './customer';

export class Car {
    constructor(
        public id:number = 0,
        public brand: string = '',
        public model: string ='',
        public carRegNo: string = '',
        public carPlateNo:string ='',
        public entryDate:string = '',
        public entryTime:string = '',
        public customer:Customer = new Customer(),
        public color: string ='',
        public enginNo: string = '',
        public emrgencyContact:string = '',
        public initProblem: string = '',
        public checkOut:boolean = false,
        public checkOutDate: string = ''
    ){}
}