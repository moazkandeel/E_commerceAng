import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardService } from 'src/app/shared/interfaces/card.service';

@Component({
  selector: 'app-cart',

  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  constructor(private _CardService:CardService ){}

  cartDetails: any = {};


  removeCartItem(id: string): void {
    console.log("Trying to remove item with ID:", id); // تأكيد أن الـ ID صحيح

    this._CardService.removeItem(id).subscribe({
      next: (response) => {
        console.log("Item removed successfully:", response);
        this.cartDetails = response.data;
        this._CardService.cartNumber.next(response.numOfCartItems);
      },
      error: (err) => {
        console.error("Error removing item:", err);
      }
    });
  }


  ngOnInit(): void {
    const token = localStorage.getItem('eToken');
    if (!token) {
      console.error("User is not logged in. No token found.");
      return;
    }

    this._CardService.getUserCard().subscribe({
      next: (response) => {
        console.log("Cart data:", response);
        this.cartDetails = response.data;
      },
      error: (err) => {
        console.error("Error fetching cart:", err);
      }
    });
  }

  changeCount(id:string , countProduct:number): void {
    this._CardService.updateCart(id , countProduct).subscribe({
      next:(response)=>{
        this.cartDetails =response.data

      }
    })
  }

  clearItems(): void {
    this._CardService.clearCart().subscribe({
      next: (response) => {
        console.log(response);
        if (response.message === 'success') {
          this.cartDetails = {};
          this._CardService.cartNumber.next(0);
          
        }
      }
    });
  }


}
