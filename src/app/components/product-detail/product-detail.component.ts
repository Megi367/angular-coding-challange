import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { map } from 'rxjs/operators'
import { ApiService } from 'src/app/shared/api.service'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  products: Product[];

  constructor( private api: ApiService) {
    this.products = [];

   }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.api.getProducts()
    .subscribe(res => this.products = res as Product[]);
  }

  deleteProduct(product: any){
    this.api.delete(product.id)
    .subscribe(res=>{
      alert("Product Deletet");
      this.getAllProducts();
    })
  }
}
