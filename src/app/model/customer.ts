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

}
