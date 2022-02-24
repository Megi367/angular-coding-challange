import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent  {

  products: Product[];
  title = 'angular-crud-mock-api'

  constructor(private http: HttpClient) {
    this.products = [];
    this.getProducts();
   }

   getProducts(){
     this.http.get('http://localhost:3000/products')
     .subscribe(res => this.products = res as Product[]);
   }
}
