import { City } from './city';
import { Capability } from 'protractor';

export class Customer {
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: City;

    constructor (fullName: string, email: string, phoneNumber: string, address: string, city: City) {
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.city = city;
    }
/*
    public toJSON() {
        const a = this.city.name;
        const b = this.city.country;
        console.log(a);
        console.log(b);
        console.log('stringify done');
        return JSON.stringify({
            fullName: this.fullName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            address: this.address,
            city: { x: this.city.name }
        });
    }
*/
}
