import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service'
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent  {

  searchText: any = '';
  products: Product[];
  title = 'angular-crud-mock-api'

  constructor(private api: ApiService) {
    this.products = [];
   }

   ngOnInit(): void {
    this.getAllProducts();
  }

   getAllProducts(){
     this.api.getProducts()
     .subscribe(res => this.products = res as Product[]);
   }
}
