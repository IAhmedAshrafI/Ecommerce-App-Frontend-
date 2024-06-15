import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { IProducts } from '../shared/Models/Products';
import { ICategory } from '../shared/Models/Category';
import { shopParams } from '../shared/Models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('myInput') inputValue:ElementRef;
  products: IProducts[];
  categories: ICategory[];
  shopParams = new shopParams();
  totalCount: number;
  p: number = 1;
  value: string;
  sortOptions = [
    { name: 'Name', value: 'Name' },
    { name: 'Price: Max-Min', value: 'PriceDesc' },
    { name: 'Price: Min-Max', value: 'PirceAsync' }
  ]

  constructor(private shopservice: ShopService) { }

  getProducts() {
    this.shopservice.getProduct(this.shopParams).subscribe(res => {
      this.products = res.data;
      this.totalCount = res.count;
      this.shopParams.pageNumber = res.pageNumber;
      this.shopParams.pageSize = res.pageSize;
    }
    )
  }

  getCategories() {
    this.shopservice.getCategory().subscribe(res => {
      this.categories = [{ id: 0, name: 'All', description: '' }, ...res];
    }
    )
  }

  onCategorySelect(categoryId: number) {
    this.shopParams.categoryId = categoryId;
    this.getProducts();
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  onSortSelect(sort: Event) {
    let sortValue = (sort.target as HTMLSelectElement).value;
    this.shopParams.sortSelect = sortValue;
    this.getProducts();
  }

  onSearch(inputValue: string) {
    if (inputValue) {
      this.shopParams.search = inputValue;
      this.getProducts();
    }
  }

  onReset() {
    this.inputValue.nativeElement.value = '';
    this.getProducts();
  }
}
