import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule), data: { breadcrumb: { skip: true } } },
  {
    path: 'basket', loadChildren: () => import('./basket/basket.module')
      .then(mo => mo.BasketModule), data: { breadcurmb: 'Basket' }
  },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule), data: { breadcrumb: { skip: true } } },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: () => import('./core/orders/orders.module')
      .then(mo => mo.OrdersModule), data: { breadcurmb: 'Orders' }
  },
  {
    canActivate: [AuthGuard],
    path: 'checkout', loadChildren: () => import('./checkout/checkout.module')
      .then(mo => mo.CheckoutModule), data: { breadcurmb: 'Checkout' }
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
