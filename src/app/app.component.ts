import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProducts } from './shared/Models/Products';
import { IPagination } from './shared/Models/Pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor() {
  }

  ngOnInit(): void {

  }
}
