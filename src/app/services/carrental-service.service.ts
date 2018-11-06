import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../model/customer';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CarrentalServiceService {

  constructor(private http: HttpClient) { }

  public searchCars(pickupLocation: string, pickupDateTime: string, dropOffLocation: string, dropoffDateTime: string) {
    const url = `/server/search/from/${pickupLocation}/${pickupDateTime}/to/${dropOffLocation}/${dropoffDateTime}`;
    return this.http.get(url, httpOptions);
  }

  public chooseCategory(pickupLocation: string, pickupDateTime: string, dropOffLocation: string, dropoffDateTime: string, 
                        chosenCategory: string) {
    const url = `/server/search/from/${pickupLocation}/${pickupDateTime}/to/${dropOffLocation}/${dropoffDateTime}/${chosenCategory}`;
    return this.http.post(url, null, httpOptions);
  }

  public loadReservation(reservationNumber: string) {
    const url = `/server/reservation/${reservationNumber}`;
    return this.http.get(url, httpOptions);
  }

  public setExtra(reservationNumber: string, extras: string[]) {
    // PUT http://localhost:8081/reservation/2d6b0f50-e348-40d4-b06c-65f08a626595/extras/GPS
    const url = `/server/reservation/${reservationNumber}/extras`;
    return this.http.put(url, extras, httpOptions);
  }

  public setInsurance(reservationNumber: string, insuranceType: string) {
    // http://localhost:8081/reservation/6e2c79ad-f6ae-4683-9474-18e4cd16c439/insurance/FULL_INSURANCE
    const url = `/server/reservation/${reservationNumber}/insurance/${insuranceType}`;
    return this.http.put(url, httpOptions);
  }

  public setCustomerDetails(reservationNumber: string, customerDetails: Customer) {
    // http://localhost:8081/reservation/ae8e885c-ce1d-4f57-a139-71d5dc2e757e/customer-details
    const url = `/server/reservation/${reservationNumber}/customer-details`;
    return this.http.put(url, JSON.stringify(customerDetails), httpOptions);
  }

  public reserve(reservationNumber: string) {
    // http://localhost:8081/reservation/ae8e885c-ce1d-4f57-a139-71d5dc2e757e/confirm
    const url = `/server/reservation/${reservationNumber}/confirm`;
    return this.http.post(url, null, httpOptions);
  }

}
