import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import {  HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _AuthService: AuthService , private _Router:Router) {}


  registerSub !: Subscription;
  msgError:string ='';
  isLoading:boolean= false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]), // ✅ تصحيح الاسم والـ Regex
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]), // ✅ تصحيح الاسم والـ Regex
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  });

  handleForm(): void {

    if (this.registerForm.valid) {  // ✅ شرط التحقق قبل الإرسال
      this.isLoading=true;
      this.registerSub =this._AuthService.setRegister(this.registerForm.value).subscribe({
        next: (response) => {
          console.log("✅ Registration Successful:", response);
          if (response.message=='success') {  //login
            this._Router.navigate(['/login'])
          }
        },

        error: (err:HttpErrorResponse) => {
          this.isLoading=false;
          this.msgError =err.error.message
          // console.log("❌ Registration Failed:" ,err.error.message);
        }
      });
    } else {

      this.registerForm.markAllAsTouched()
      console.log("❌ Form is invalid. Please check the errors.");
    }
  }


  
ngOnDestroy(): void {
  this.registerSub?.unsubscribe()
 }
 
 
}
