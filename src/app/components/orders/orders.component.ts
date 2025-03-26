import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersService = inject(OrdersService);

  
  orders: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  });

  cardId: string | null = null;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=> {
      this.cardId = params.get('id');
      console.log("params cart",this.cardId);
  }});
  }

  orderSubmit(): void {
    if (!this.cardId) {
      console.error("Cart ID is missing!");
      return;
    }

    console.log(this.orders.value);
    this._OrdersService.checkOut(this.cardId, this.orders.value).subscribe({
      next: response => {
        console.log("Order Submitted Successfully!", response);
        if (response.status === 'success') {
          // response.sessions.url ;
          window.open(response.sessions.url)
          
        }
      },
      error: err => {
        console.error("Error Submitting Order:", err);
      }
    });
  }
}
