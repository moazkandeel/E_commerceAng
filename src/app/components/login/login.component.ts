import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import {  HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',

  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor(private _AuthService: AuthService , private _Router:Router) {}

    msgError:string ='';
    isLoading:boolean= false;

    loginForm: FormGroup = new FormGroup({

      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]), // ✅ تصحيح الاسم والـ Regex

    });

    handleForm(): void {

      if (this.loginForm.valid) {  // ✅ شرط التحقق قبل الإرسال
        this.isLoading=true;
        this._AuthService.setLogin(this.loginForm.value).subscribe({
          next: (response) => {
            console.log("✅ Registration Successful:", response);
            if (response.message=='success') {  //login

              localStorage.setItem('eToken' ,response.token);
              this._AuthService.saveUserData();
              this._Router.navigate(['/home'])
            }
          },

          error: (err:HttpErrorResponse) => {
            this.isLoading=false;
            this.msgError =err.error.message
            // console.log("❌ Registration Failed:" ,err.error.message);
          }
        });
      } else {
        this.loginForm.markAllAsTouched()
        console.log("❌ Form is invalid. Please check the errors.");
      }
    }

}
