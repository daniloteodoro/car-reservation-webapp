import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-confirmation',
  template: `
    <p>
      Order placed!
    </p>
  `,
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
