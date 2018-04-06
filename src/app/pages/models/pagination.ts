export class Pagination{
    constructor(
        public page:number = 1,
        public itemPerPage:number = 10,
        public totalItem:number = 10
    ){}
}