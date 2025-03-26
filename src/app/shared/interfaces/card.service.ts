import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private _HttpClient:HttpClient) { }

  cartNumber : BehaviorSubject<number>=new BehaviorSubject(0);

  headers: any ={token:localStorage.getItem('eToken')}

  addToCard(ProductId:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart` , {
      "productId": ProductId
  }
 , {
    headers:  this.headers
 })
  }


  getUserCard():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart` ,{
    headers:  this.headers
 })
  }
  removeItem(productId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{
    headers:  this.headers
 })
  }
 
  updateCart(productId:string , count:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{
      "count":count
    },{
    headers:  this.headers
 })
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: this.headers
    });
  }
  
}
