import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'https://ecommerce.routemisr.com/api/v1/wishlist';

  constructor(private _HttpClient: HttpClient) { }

  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        token: localStorage.getItem('eToken') || ''
      })
    };
  }

  addWishlist(productId: string): Observable<any> {
    return this._HttpClient.post(this.apiUrl, { productId }, this.getHeaders());
  }

  getWishlist(): Observable<any> {
    return this._HttpClient.get(this.apiUrl, this.getHeaders());
  }
  
  removeItem(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.apiUrl}/${productId}`, this.getHeaders());
  }
  
  
}