import { CdkStepper } from '@angular/cdk/stepper';
import { Component, OnInit, Input } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {

  @Input() appStepper: CdkStepper;
  constructor(private basketServices: BasketService) { }

  ngOnInit(): void {
  }
  createPaymentIntent() {
    return this.basketServices.createPaymentIntent().subscribe({
      next: (() => {
        this.appStepper.next();

      }),
      error: ((err) => { console.error(err.message) })
    })
  }

}