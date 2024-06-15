import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/Models/Pagination';
import { ICategory } from '../shared/Models/Category';
import { map } from 'rxjs';
import { shopParams } from '../shared/Models/shopParams';
import { IProducts } from '../shared/Models/Products';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = "https://localhost:44336/api/";
  constructor(private Http: HttpClient) { }


  getProduct(shopParams: shopParams) {
    let params = new HttpParams();
    if (shopParams.categoryId) {
      params = params.append('categoryId', shopParams.categoryId.toString());
    }
    if (shopParams.sortSelect) {
      params = params.append('sort', shopParams.sortSelect);
    }
    if (shopParams.search) {
      params = params.append("Search", shopParams.search)
    }
    return this.Http.get<IPagination>(this.baseUrl + "Products/get-all-products", { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;

        })
      )
  }

  getCategory() {
    return this.Http.get<ICategory[]>(this.baseUrl + "Categories/get-all-categories");
  }

  getProductById(id: number) {
    return this.Http.get<IProducts>(this.baseUrl + 'Products/get-product-by-id/' + id);
  }
}

