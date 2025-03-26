import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/interfaces/category';
import { EcomdatapService } from 'src/app/shared/services/ecomdatap.service';
@Component({
  selector: 'app-detailscate',
  templateUrl: './detailscate.component.html',
  styleUrls: ['./detailscate.component.css']
})
export class DetailscateComponent {


   constructor(private _ActivatedRoute:ActivatedRoute , private _EcomdatapService:EcomdatapService){}
  
    categoriesDetails:Category ={} as Category
    ngOnInit():void{
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          let idCategories:any =params.get('id');
  
          this._EcomdatapService.getCategoriesDetails(idCategories).subscribe({
            next:(response)=>{
             this.categoriesDetails = response.data;
             console.log(response);
             
            }
          })
        }
      })
    }

}
