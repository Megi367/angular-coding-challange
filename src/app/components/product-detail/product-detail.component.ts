import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { map } from 'rxjs/operators'
import { ApiService } from 'src/app/shared/api.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormBuilder} from '@angular/forms'
import { ProductModel } from './product-detail.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  products: Product[];
  closeResult = '';
  addProductForm!: FormGroup;
  productModelObject: ProductModel = new ProductModel();

  // Show and hide Add Products or Update Products buttons
  showADD!: boolean;
  showUpdate!: boolean;

  constructor( private api: ApiService,
               private modalService: NgbModal,
               private formBuilder: FormBuilder) {
    this.products = [];
   }

  ngOnInit(): void {
    this.getAllProducts();

    this.addProductForm = this.formBuilder.group({
      name:[''] ,
      color:[''] ,
      size: [''],
      status:[''],
      conditions:[''] 
    })
  }

  // CRUDS from the API Service
  getAllProducts(){
    this.api.getProducts()
    .subscribe(res => this.products = res as Product[]);
  }

  postProductDetails(){
    this.productModelObject.name = this.addProductForm.value.name;
    this.productModelObject.color = this.addProductForm.value.color;
    this.productModelObject.size = this.addProductForm.value.size;
    this.productModelObject.status = this.addProductForm.value.status;
    this.productModelObject.conditions = this.addProductForm.value.conditions;

    this.api.postProducts(this.productModelObject)
    .subscribe(res=>{
      console.log(res);
      alert("Product Added Successfully!");
      this.addProductForm.reset();
      this.getAllProducts();
    },
    err=>{
      alert("Something Went Wrong!")
    })
  }

  deleteProduct(product: any){
    this.api.delete(product.id)
    .subscribe(res=>{
      alert("Product Deletet");
      this.getAllProducts();
    })
  }

  onEdit(product: any, content:any){
    this.showADD = false;
    this.showUpdate = true;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.productModelObject.id = product.id;
    this.addProductForm.controls['name'].setValue(product.name);
    this.addProductForm.controls['color'].setValue(product.color);
    this.addProductForm.controls['size'].setValue(product.size);
    this.addProductForm.controls['status'].setValue(product.status);
    this.addProductForm.controls['conditions'].setValue(product.conditions);
  }

  updateProductDetails(){
    this.productModelObject.name = this.addProductForm.value.name;
    this.productModelObject.color = this.addProductForm.value.color;
    this.productModelObject.size = this.addProductForm.value.size;
    this.productModelObject.status = this.addProductForm.value.status;
    this.productModelObject.conditions = this.addProductForm.value.conditions;

    this.api.updateProduct(this.productModelObject, this.productModelObject.id)
    .subscribe(res=>{
      alert("Product Updated Successfully!");
      this.addProductForm.reset();
      this.getAllProducts();
    },err=>{
      alert("Something Went Wrong!");
    }
    )
  }


  // open modal for Adding Products Logic
  open(content: any) {
    this.showADD = true;
    this.showUpdate = false;
    this.addProductForm.reset();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  closeForm(){
    this.addProductForm.reset();
  }
}
