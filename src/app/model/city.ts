export class City {
    name: string;
    country: string;

    constructor (name: string, country: string) {
        this.name = name;
        this.country = country;
    }

    public toString() {
        return this.name + '-' + this.country.toUpperCase();
    }
}
