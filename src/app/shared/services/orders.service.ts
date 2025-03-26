import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient: HttpClient) { }

  checkOut(idCart: string | null, shippingDetails: object): Observable<any> {
    const token = localStorage.getItem('eToken');

    if (!token) {
      console.error('🚨 No token found. Please login first.');
      return throwError(() => new Error('No token found. Please login first.'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${idCart}?url=http://localhost:4200`,
      { shippingAddress: shippingDetails },
      { headers }
    ).pipe(
      catchError(error => {
        console.error('❌ Order submission failed:', error);
        return throwError(() => error);
      })
    );
  }
}
