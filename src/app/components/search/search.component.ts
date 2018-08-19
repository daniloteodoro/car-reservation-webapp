import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CarrentalServiceService } from '../../services/carrental-service.service';

@Component({
  selector: 'app-search',
  template: `
  <div class="container">
    <form *ngIf="started" [formGroup]="searchCarsForm" (ngSubmit)="submitRegistration()" novalidate>
      <div *ngIf="validMessage != ''">
        <h3 class="has-info">{{validMessage}}</h3>
      </div>
      <div class="form-group">
        <label>Pick-up Location</label>
        <select class="form-control" formControlName="pickupLocation" required>
          <option value="">Please select a pick-up location</option>
          <option *ngFor="let m of models"
                  [value]="m">
                  {{m}}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Pick-up date/time</label>
        <input type="text" class="form-control" formControlName="pickupDateTime" required/>
      </div>
      <div class="form-group">
        <label>Drop-off Location</label>
        <select class="form-control" formControlName="dropoffLocation" required>
          <option value="">Please select a drop-off location</option>
          <option *ngFor="let m of models"
                  [value]="m">
                  {{m}}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Drop-off date/time</label>
        <input type="text" class="form-control" formControlName="dropoffDateTime" required/>
      </div>
      <button type="submit" class="btn btn-primary" >Search</button>
  </form>
  <table class="table table-bordered table-inverse">
    <tr>
      <th>License Plate</th>
      <th>Category</th>
      <th>Brand</th>
      <th>Model</th>
      <th class="text-right">Price per day (EUR)</th>
    </tr>
    <tr *ngFor="let car of cars">
      <td>
        <a [routerLink]="['/admin/view', car.licensePlate.data]">{{car.licensePlate.data}}</a>
      </td>
      <td>
        {{car.model.category}}
      </td>
      <td>
        {{car.model.brand.description}}
      </td>
      <td>
        {{car.model.description}}
      </td>
      <td class="text-right">
        {{car.pricePerDay}}
      </td>
    </tr>
  </table>
</div>
  `,
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  models: string[] = [
    'Rotterdam-NL',
    'Sao Paulo-BR',
    'New York-US'
  ];
  searchCarsForm: FormGroup;
  validMessage = '';
  started: boolean = undefined;
  public cars;

  constructor(private carRentalService: CarrentalServiceService) { }


  ngOnInit() {
    console.log('OnInit');
    this.searchCarsForm = new FormGroup({
      pickupLocation: new FormControl('', Validators.required),
      pickupDateTime: new FormControl('', Validators.required),
      dropoffLocation: new FormControl('', Validators.required),
      dropoffDateTime: new FormControl('', Validators.required)
    });
    console.log('Finish OnInit');
    console.log('this.form: ' + this.searchCarsForm.value);
    this.started = true;
  }

  searchCars() {
    const pickupLocation = this.searchCarsForm.value.pickupLocation;
    const pickupDateTime = this.searchCarsForm.value.pickupDateTime;
    const dropoffLocation = this.searchCarsForm.value.dropoffLocation;
    const dropoffDateTime = this.searchCarsForm.value.dropoffDateTime;

    this.carRentalService.searchCars(pickupLocation, pickupDateTime, dropoffLocation, dropoffDateTime).subscribe(
      data => { this.cars = data; console.info(data); },
      err => console.error(err),
      () => console.log('cars loaded')
    );
  }

  submitRegistration() {
    if (this.searchCarsForm.valid) {
      this.validMessage = '';
      this.searchCars();
    } else {
      this.validMessage = 'Please fill out the form before searching!';
    }
  }

}
