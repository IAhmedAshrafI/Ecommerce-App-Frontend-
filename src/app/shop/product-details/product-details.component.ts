import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from 'src/app/shared/Models/Products';
import { ShopService } from '../shop.service';
import { BasketService } from 'src/app/basket/basket.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Basket } from 'src/app/shared/Models/basket';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  quantity: number = 1;
  product: IProducts;
  constructor(private shopService: ShopService, private activeRoute: ActivatedRoute, private bcService: BreadcrumbService, private basketService: BasketService) {
    this.bcService.set('@productDetails', ' ');

  }

  ngOnInit(): void {
    this.loadProduct();
  }
  loadProduct() {
    this.shopService.getProductById(parseInt(this.activeRoute.snapshot.paramMap.get('id')))
      .subscribe(res => {
        this.product = res;
      });
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }
  incrementQuantity() {
    this.quantity++;
  }
  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

}