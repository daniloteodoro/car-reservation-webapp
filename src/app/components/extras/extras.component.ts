import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CarrentalServiceService } from '../../services/carrental-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-extras',
  template: `
    <div class="container">
      You chose: {{reservation?.category.type}}<br/>
      Price: EUR {{reservation?.category.pricePerDay}}<br/>
      Total: EUR {{reservation?.total}}<br/>
      <br/>
      <form *ngIf="started" [formGroup]="extrasForm" (ngSubmit)="submitExtras()" novalidate>
        <div *ngIf="validMessage != ''">
          <h3 class="has-info">{{validMessage}}</h3>
        </div>
        <div class="form-group">
          <label>Insurance Type</label>
          <select class="form-control" formControlName="insuranceType" required>
            <option *ngFor="let m of insuranceTypeList"
                    [value]="m">
                    {{m}}
            </option>
          </select>
        </div>
        <label>Select extras</label>
        <div class="form-group">
          <label><input type="checkbox" formControlName="checkGPS" class="small-margin" ng-model="started">GPS</label>
        </div>
        <div class="form-group">
          <label><input type="checkbox" formControlName="checkAdditionalDriver" class="small-margin">Additional Driver</label>
        </div>
        <div class="form-group">
          <label><input type="checkbox" formControlName="checkChildSeat" class="small-margin">Child Seat</label>
        </div>
        <button type="submit" class="btn btn-primary"> Apply </button>
        <br/>
      </form>
    </div>
  `,
  styleUrls: ['./extras.component.css']
})
export class ExtrasComponent implements OnInit {

  private reservation;
  extrasForm: FormGroup;
  validMessage = '';
  started: boolean = undefined;
  private rentGPS: Boolean;
  private additionalsList: string[] = [
    'GPS',
    'Additional driver',
    'Child seat'
  ];
  private insuranceTypeList: string[] = [
    'STANDARD_INSURANCE',
    'FULL_INSURANCE'
  ];

  constructor(private route: ActivatedRoute, private carRentalService: CarrentalServiceService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('reservation');

    this.extrasForm = new FormGroup({
      insuranceType: new FormControl('STANDARD_INSURANCE', Validators.required),
      checkGPS: new FormControl(false),
      checkAdditionalDriver: new FormControl(false),
      checkChildSeat: new FormControl(false)
    });

    this.carRentalService.loadReservation(id).subscribe(
      reservation => {
        this.setReservation(reservation);
        console.log(reservation);
      },
      err => { console.error(err); },
      () => {
        this.started = true;
      }
    );

  }

  public setReservation(reservation) {
    this.reservation = reservation;
    this.extrasForm.controls['insuranceType'].setValue(reservation.insurance);
    this.extrasForm.controls['checkGPS'].setValue((reservation.extras.indexOf('GPS') > -1));
    this.extrasForm.controls['checkAdditionalDriver'].setValue((reservation.extras.indexOf('ADDITIONAL_DRIVER') > -1));
    this.extrasForm.controls['checkChildSeat'].setValue((reservation.extras.indexOf('CHILD_SEAT') > -1));
  }

  public setExtraProducts(extras: string[]) {
    return this.carRentalService.setExtra(this.reservation.reservationNumber.value, extras);
  }

  public setInsuranceType(insurance) {
    return this.carRentalService.setInsurance(this.reservation.reservationNumber.value, insurance);
  }

  public applyExtras() {
    const insuranceType = this.extrasForm.value.insuranceType;
    const checkGPS = this.extrasForm.value.checkGPS;
    const checkDriver = this.extrasForm.value.checkAdditionalDriver;
    const checkChildSeat = this.extrasForm.value.checkChildSeat;
    const extras = [];

    if (checkGPS) {
      extras.push('GPS');
    }
    if (checkDriver) {
      extras.push('ADDITIONAL_DRIVER');
    }
    if (checkChildSeat) {
      extras.push('CHILD_SEAT');
    }

    // Reload local reservation using the return of the API.
    this.setExtraProducts(extras).subscribe(
      data => { },
      err => ( console.error(err)),
      () => {
        this.setInsuranceType(insuranceType).subscribe(
          data => { this.setReservation(data); },
          err => ( console.error(err)),
          () => console.log('Extras and insurance done')
        );
      }
    );
  }

  private submitExtras() {
    if (this.extrasForm.valid) {
      this.validMessage = '';
      this.applyExtras();
    } else {
      this.validMessage = 'Please fill out the form before changing extras!';
    }
  }

}
