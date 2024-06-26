import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from 'src/app/shared/Models/Products';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  quantity: number = 1;
  product: IProducts;
  constructor(private shopService: ShopService, private activeRoute: ActivatedRoute) {

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