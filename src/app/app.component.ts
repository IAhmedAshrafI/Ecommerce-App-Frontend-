import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProducts } from './shared/Models/Products';
import { IPagination } from './shared/Models/Pagination';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private accountService: AccountService, private basketService: BasketService) {
  }

  ngOnInit(): void {
    this.loadCurrentUser();
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe({
        next: () => { console.log('intialBasket') },
        error: (err) => { console.error(err) }
      })
    }

  }


  loadCurrentUser() {
    const token = localStorage.getItem('token');
    // if (token) {

    this.accountService.loadCurrentUser(token).subscribe({
      next: () => { console.log('loadded User Succeffully') },
      error: (err) => { console.log(err) }
    })
  }
}
