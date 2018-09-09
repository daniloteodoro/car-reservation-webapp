import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarrentalServiceService } from '../../services/carrental-service.service';
import { Customer } from '../../model/customer';
import { City } from '../../model/city';

@Component({
  selector: 'app-customer-details',
  template: `
    <div class="container">
      You chose: {{reservation?.category.type}}<br/>
      Total: EUR {{reservation?.total}}<br/>
      <br/>

      <form *ngIf="started" [formGroup]="customerDetailsForm" (ngSubmit)="submitCustomerDetails()" novalidate>
        <div *ngIf="validMessage != ''">
          <h3 class="has-info">{{validMessage}}</h3>
        </div>

        <div class="form-group">
          <label>Full name</label>
          <input type="text" formControlName="customerFullName" class="form-control" />
        </div>

        <div class="form-group">
          <label>E-mail</label>
          <input type="text" formControlName="customerEmail" class="form-control" />
        </div>

        <div class="form-group">
          <label>Phone</label>
          <input type="text" formControlName="customerPhone" class="form-control" />
        </div>

        <div class="form-group">
          <label>Address</label>
          <input type="text" formControlName="customerAddress" class="form-control" />
        </div>

        <div class="form-group">
          <label>City</label>
          <select class="form-control" formControlName="customerCity" required>
            <option value="">Please select your current city</option>
            <option *ngFor="let m of cities"
                    [ngValue]="m">
                    {{m}}
            </option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary"> Apply </button>

      </form>
    </div>
  `,
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  private reservation;
  customerDetailsForm: FormGroup;
  validMessage = '';
  started: boolean = undefined;
  cities: City[] = [
    new City('Amsterdam', 'NL'),
    new City('New York', 'US'),
    new City('Rotterdam', 'NL')
  ];

  constructor(private route: ActivatedRoute, private carRentalService: CarrentalServiceService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('reservation');

    this.customerDetailsForm = new FormGroup({
      customerFullName: new FormControl('John Doe', Validators.required),
      customerEmail: new FormControl('john@doe.com', Validators.required),
      customerPhone: new FormControl('12345678', Validators.required),
      customerAddress: new FormControl('Straat, 123', Validators.required),
      customerCity: new FormControl(null, Validators.required)
    });

    this.carRentalService.loadReservation(id).subscribe(
      reservation => {
        this.setReservation(reservation);
      },
      err => { console.error(err); },
      () => this.started = true
    );
  }

  public setReservation(reservation) {
    this.reservation = reservation;
    this.customerDetailsForm.controls['customerFullName'].setValue(reservation.customer.fullName);
    this.customerDetailsForm.controls['customerEmail'].setValue(reservation.customer.email);
    this.customerDetailsForm.controls['customerPhone'].setValue(reservation.customer.phone);
    this.customerDetailsForm.controls['customerAddress'].setValue(reservation.customer.address);
    this.customerDetailsForm.controls['customerCity'].setValue(reservation.customer.city);
  }

  private submitCustomerDetails() {
    if (this.customerDetailsForm.valid) {
      this.validMessage = '';
      this.applyExtras();
    } else {
      this.validMessage = 'Please fill out the form before continue!';
    }
  }

  public applyExtras() {
    const fullName = this.customerDetailsForm.value.customerFullName;
    const email = this.customerDetailsForm.value.customerEmail;
    const phone = this.customerDetailsForm.value.customerPhone;
    const address = this.customerDetailsForm.value.customerAddress;
    const city = this.customerDetailsForm.value.customerCity;

    const customer = new Customer(fullName, email, phone, address, city);

    this.carRentalService.setCustomerDetails(this.reservation.reservationNumber.value, customer).subscribe(
      data => console.log(data),
      err => console.error(err),
      () => console.log('done ')
    );
  }

}
