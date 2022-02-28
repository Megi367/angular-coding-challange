import { Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class ApiService{

    constructor(private http: HttpClient) {}

    // post CRUD
    postProducts(data: any){
        return this.http.post<any>('http://localhost:3000/products', data)
        .pipe(map((res:any)=>{
            return res;
          }))
    }

    // get CRUD
    getProducts(){
        return this.http.get('http://localhost:3000/products')
        .pipe(map((res:any)=>{
            return res;
        }))
      }

    // update CRUD
    updateProduct(data: any, id: number){
        return this.http.put<any>('http://localhost:3000/products/'+id, data)
        .pipe(map((res:any)=>{
            return res;
          }))
    }
    // delete crud
    delete(id: number){
    return this.http.delete<any>('http://localhost:3000/products/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
        }
        
    }
