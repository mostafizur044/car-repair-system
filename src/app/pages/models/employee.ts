export class Employee {
    constructor(
        public id:number = 0,
        public firstName: string = '',
        public lastName: string ='',
        public dob: string = '',
        public gender:string = '',
        public phone:string = '',
        public email: string ='',
        public address: string = '',
        public joinDate:string = '',
        public emergecyContact: string = ''
    ){}
}