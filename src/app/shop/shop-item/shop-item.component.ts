import { Component, OnInit, Input } from '@angular/core';
import { IProducts } from 'src/app/shared/Models/Products';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit {
  
@Input() product:IProducts;

  constructor() { }

  ngOnInit(): void {
  }

}
