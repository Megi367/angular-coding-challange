import { Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class ApiService{

    constructor(private http: HttpClient) {}

    // post CRUD Products
    postProducts(data: any){
        return this.http.post<any>('http://localhost:3000/products', data)
        .pipe(map((res:any)=>{
            return res;
          }))
    }

    // get CRUD Products
    getProducts(){
        return this.http.get('http://localhost:3000/products')
        .pipe(map((res:any)=>{
            return res;
        }))
      }

    // update CRUD Products
    updateProduct(data: any, id: number){
        return this.http.put<any>('http://localhost:3000/products/'+id, data)
        .pipe(map((res:any)=>{
            return res;
          }))
    }
    // delete crud Products
    delete(id: number){
    return this.http.delete<any>('http://localhost:3000/products/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
        }

    // get CRUD Profiles
    getProfiles(){
      return this.http.get('http://localhost:3000/signup')
      .pipe(map((res:any)=>{
          return res;
      }))
    }

    // update CRUD Products
    updateProfiles(data: any, id: number){
      return this.http.put<any>('http://localhost:3000/signup/'+id, data)
      .pipe(map((res:any)=>{
          return res;
        }))
    }
    // delete crud Products
    deleteProfiles(id: number){
    return this.http.delete<any>('http://localhost:3000/signup/'+id)
    .pipe(map((res:any)=>{
    return res;
    }))
      }

        
    }
