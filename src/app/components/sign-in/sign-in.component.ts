import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public signinForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      username:[''],
      password:['']
    })

  }

  signIn(){
    this.http.get<any>("http://localhost:3000/signup")
    .subscribe(res=>{
      const user = res.find((a: any)=>{
        return a.username === this.signinForm.value.username && a.password === this.signinForm.value.password
      });
      if(user){
        alert("Sign In Successfull!");
        

        localStorage.setItem('token',"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2NDY1OTEzOTAsImV4cCI6MTY3ODEyNzM5MCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.IF4U_5xwuDud2mA9I3NKdUTaKEJ3DYUiFujDnsQb8-Q")
        this.signinForm.value.username=="admin"? localStorage.setItem('userType', 'Admin') : localStorage.setItem('userType', 'User')
        this.signinForm.reset();
        this.router.navigate(['products'])
      }else{
        alert("User Not Found!")
      }
    }, err=>{
      alert("Something went wrong with Sign In!")
    })
  }

}
