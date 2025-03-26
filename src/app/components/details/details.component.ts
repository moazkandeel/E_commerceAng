import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
import { EcomdatapService } from 'src/app/shared/services/ecomdatap.service';
import { CardService } from 'src/app/shared/interfaces/card.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  constructor(private _ActivatedRoute:ActivatedRoute , private _CardService:CardService, private _EcomdatapService:EcomdatapService ,private _ToastrService:ToastrService){}

  protectDetails:Product ={} as Product
  ngOnInit():void{
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let idProduct:any =params.get('id');

        this._EcomdatapService.getProductDetails(idProduct).subscribe({
          next:(response)=>{
           this.protectDetails = response.data;
          }
        })
      }
    })
  }


  addCars(id: string): void {
    this._CardService.addToCard(id).subscribe({
      next: (response) => {
        console.log(response);

        this._ToastrService.success(response.message , "Fresh Cart");

        // تحديث العدد في BehaviorSubject
        this._CardService.cartNumber.next(response.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
