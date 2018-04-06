import { Car } from "./car";
import { Stock } from "./stock";

export class CheckOut{
    constructor(
        public car:Car =new Car(),
        public itemSold:Stock[] = [],
        public serviceCharge:string = '0',
        public totalPrice: number = 0 
    ){}
}