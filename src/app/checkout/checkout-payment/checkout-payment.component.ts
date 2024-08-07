import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/Models/basket';
import { IOrder } from 'src/app/shared/Models/order';
import { CheckoutService } from '../checkout.service';

declare var Stripe;
@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy {

  @ViewChild('cardNumber', { static: true }) cardNumberElement: ElementRef;
  @ViewChild('cardExpiry', { static: true }) cardExpiryElement: ElementRef;
  @ViewChild('cardCvc', { static: true }) cardCvcElement: ElementRef;
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;
  cardHandler = this.onChange.bind(this);
  loading: boolean = false;
  cardNumberValid = false;
  cardExpiryValid = false;
  cardCvcValid = false;


  @Input() checkoutForm: FormGroup;
  constructor(private checkoutServices: CheckoutService, private basketServices: BasketService
    , private router: Router) { }

  ngAfterViewInit(): void {
    this.stripe = Stripe('pk_test_51PYqFQKbp3v4OpTiBys10L4IQ0o89WzBrk97lJOrVjRdbFFTN8aLewVnGeQzfZDI6dqmH7P2iNYmXIxup25EEQJl00O2oDeQFQ');
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener('change', this.cardHandler)

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandler)

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler)


  }
  ngOnDestroy() {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }
  onChange(event) {
    console.log(event);
    if (event.error) {
      this.cardErrors = event.error.message;
    }
    else {
      this.cardErrors = null;
    }
    switch (event.elementType) {
      case 'cardNumber':
        this.cardNumberValid = event.complete;
        break;
      case 'cardExpiry':
        this.cardExpiryValid = event.complete;
        break;
      case 'cardCvc':
        this.cardCvcValid = event.complete;
        break;

    }
  }
  async submitOrder() {
    this.loading = true;
    const basket = this.basketServices.getCurrentBasketValue();
    if (!basket) throw new Error('This basket can not found');

    try {
      const createOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentWithStripe(basket);


      if (paymentResult.paymentIntent) {
        this.basketServices.deleteBasket(basket);
        const navigationExtras: NavigationExtras = { state: createOrder }
        this.router.navigate(['checkout/success'], navigationExtras)
      } else {
        console.error(paymentResult.error.message)
      }
      this.loading = false;
    } catch (error) {
      console.error(error);
      this.loading = false;

    }



    // this.checkoutServices.createOrder(orderToCreate).subscribe({
    //   next: ((order: IOrder) => {
    //     // this.toastr.success('Order Submit Succssfully!');
    //     this.stripe.confirmCardPayment(basket.clientSecret, {
    //       payment_method: {
    //         card: this.cardNumber,
    //         billing_details: {
    //           name: this.checkoutForm.get('paymentForm').get('nameOnCard').value
    //         }
    //       }
    //     }).then(result => {
    //       console.log(result);
    //       if (result.paymentIntent) {
    //         this.basketServices.deleteLocalBasekt(basket.id);
    //         const navigationExtras: NavigationExtras = { state: order }
    //         this.router.navigate(['checkout/success'], navigationExtras)
    //       } else {
    //         this.toastr.error(result.error.message)
    //       }
    //     })

    //   }),
    //   error: ((err) => { this.toastr.error(err.message); console.error(err) })
    // });
  }
  private async confirmPaymentWithStripe(basket: IBasket) {
    return this.stripe.confirmCardPayment(basket.clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.checkoutForm.get('paymentForm').get('nameOnCard').value
        }
      }
    })
  }
  private async createOrder(basket: IBasket) {
    const orderToCreate = this.getOrderToCreate(basket);
    return this.checkoutServices.createOrder(orderToCreate).toPromise();
  }
  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: this.checkoutForm.get('deliveryForm.deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('addressForm').value
    }
  }

}