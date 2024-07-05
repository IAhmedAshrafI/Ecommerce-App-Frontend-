import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { BasketSummeryComponent } from './components/basket-summery/basket-summery.component';
import { CheckoutSuccessComponent } from './components/checkout-success/checkout-success.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    OrderTotalsComponent,
    BasketSummeryComponent,
    CheckoutSuccessComponent,
    StepperComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    CdkStepperModule,
    RouterModule
  ],
  exports: [
    PaginationModule,
    BsDropdownModule,
    ReactiveFormsModule,
    OrderTotalsComponent,
    CarouselModule,
    CdkStepperModule,
    StepperComponent,
    BasketSummeryComponent
  ]
})
export class SharedModule { }
