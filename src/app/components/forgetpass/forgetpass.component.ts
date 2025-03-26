import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonModule } from '@angular/common'; // تأكد من استيراد CommonModule

@Component({
  selector: 'app-forgetpass',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // أضف CommonModule هنا
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent {

  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  step: number = 1;

  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6}$/)])
  });

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)])
  });

  verifyEmailSubmit(): void {
    this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg === 'success') {
          this.step = 2;
        }
      }
    });
  }

  verifyCodeSubmit(): void {
    this._AuthService.setCodeVerify(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg === 'success') {
          this.step = 3;
        }
      }
    });
  }

  resetPasswordSubmit(): void {
    this._AuthService.setResetPass(this.resetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
       localStorage.setItem('user', res.token);
       this._Router.navigate(['/home']);
      
      }
    });
  }
}
