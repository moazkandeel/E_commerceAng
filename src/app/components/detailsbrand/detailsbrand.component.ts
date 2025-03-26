import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/shared/interfaces/brand';
import { EcomdatapService } from 'src/app/shared/services/ecomdatap.service';
@Component({
  selector: 'app-detailsbrand',
  templateUrl: './detailsbrand.component.html',
  styleUrls: ['./detailsbrand.component.css']
})
export class DetailsbrandComponent {

    constructor(private _ActivatedRoute:ActivatedRoute , private _EcomdatapService:EcomdatapService){}
    
    brandDetails:Brand ={} as Brand
      ngOnInit():void{
        this._ActivatedRoute.paramMap.subscribe({
          next:(params)=>{
            let idBrands:any =params.get('id');
    
            this._EcomdatapService.getBrandsDetails(idBrands).subscribe({
              next:(response)=>{
               this.brandDetails = response.data;
               console.log(response);
               
              }
            })
          }
        })
      }

}
