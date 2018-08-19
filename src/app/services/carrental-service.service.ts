import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CarrentalServiceService {

  constructor(private http: HttpClient) { }

  searchCars(pickupLocation: string, pickupDateTime: string, dropOffLocation: string, dropoffDateTime: string) {
    const url = `/server/search/from/${pickupLocation}/${pickupDateTime}/to/${dropOffLocation}/${dropoffDateTime}`;
    console.log(url);
    return this.http.get(url, httpOptions);
  }

}
