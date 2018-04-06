export class Customer {
    constructor(
        public id:number = 0,
        public regNo:string = '',
        public firstName: string = '',
        public lastName: string ='',
        public dob:string = '',
        public joinDate: string = '',
        public gender:string = '',
        public phone:string = '',
        public email: string ='',
        public address: string = ''
    ){}
}