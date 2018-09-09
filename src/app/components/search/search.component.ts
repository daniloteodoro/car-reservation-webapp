import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CarrentalServiceService } from '../../services/carrental-service.service';

@Component({
  selector: 'app-search',
  template: `
  <div class="container">
    <form *ngIf="started" [formGroup]="searchCarsForm" (ngSubmit)="submitSearch()" novalidate>
      <div *ngIf="validMessage != ''">
        <h3 class="has-info">{{validMessage}}</h3>
      </div>
      <div class="form-group">
        <label>Pick-up Location</label>
        <select class="form-control" formControlName="pickupLocation" required>
          <option value="">Please select a pick-up location</option>
          <option *ngFor="let m of cities"
                  [value]="m">
                  {{m}}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Pick-up date/time</label>
        <input type="text" class="form-control" formControlName="pickupDateTime" text="2011-07-16 08:00" required/>
      </div>
      <div class="form-group">
        <label>Drop-off Location</label>
        <select class="form-control" formControlName="dropoffLocation" required>
          <option value="">Please select a drop-off location</option>
          <option *ngFor="let m of cities"
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
      <th>Category</th>
      <th>Model</th>
      <th class="text-right">Price per day (EUR)</th>
    </tr>
    <tr *ngFor="let current of models">
      <td>
        <button (click)="chooseCategory(current.category.type)">anything</button>
      </td>
      <td>
        {{current.brand}} {{current.description}}
      </td>
      <td class="text-right">
        {{current.category.pricePerDay.value}}
      </td>
    </tr>
  </table>
</div>
  `,
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  cities: string[] = [
    'Amsterdam-NL',
    'New York-US',
    'Rotterdam-NL'
  ];
  searchCarsForm: FormGroup;
  validMessage = '';
  started: boolean = undefined;
  public models;

  constructor(private carRentalService: CarrentalServiceService, private router: Router) { }

  ngOnInit() {
    this.searchCarsForm = new FormGroup({
      pickupLocation: new FormControl('Rotterdam-NL', Validators.required),
      pickupDateTime: new FormControl('2011-07-16 08:00', Validators.required),
      dropoffLocation: new FormControl('Rotterdam-NL', Validators.required),
      dropoffDateTime: new FormControl('2011-07-20 16:00', Validators.required)
    });
    this.started = true;
  }

  public chooseCategory(category: string) {
    const pickupLocation = this.searchCarsForm.value.pickupLocation;
    const pickupDateTime = this.searchCarsForm.value.pickupDateTime;
    const dropoffLocation = this.searchCarsForm.value.dropoffLocation;
    const dropoffDateTime = this.searchCarsForm.value.dropoffDateTime;

    this.carRentalService.chooseCategory(pickupLocation, pickupDateTime, dropoffLocation, dropoffDateTime, category).subscribe(
      data => {
        console.log(data);
        this.showReservation(data);
      },
      err => console.error(err)
    );
  }

  private showReservation(reservation) {
    this.router.navigate(['/extras', reservation.reservationNumber.value]);
  }

  public searchCars() {
    const pickupLocation = this.searchCarsForm.value.pickupLocation;
    const pickupDateTime = this.searchCarsForm.value.pickupDateTime;
    const dropoffLocation = this.searchCarsForm.value.dropoffLocation;
    const dropoffDateTime = this.searchCarsForm.value.dropoffDateTime;

    this.carRentalService.searchCars(pickupLocation, pickupDateTime, dropoffLocation, dropoffDateTime).subscribe(
      data => { this.models = data; },
      err => console.error(err)
    );
  }

  private submitSearch() {
    if (this.searchCarsForm.valid) {
      this.validMessage = '';
      this.searchCars();
    } else {
      this.validMessage = 'Please fill out the form before searching!';
    }
  }

}
