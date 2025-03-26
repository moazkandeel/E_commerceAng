import { Component } from '@angular/core';
import { EcomdatapService } from './../../shared/services/ecomdatap.service';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {

   constructor(private _EcomdatapService: EcomdatapService  ) {}
  
   brands: any[] =  []  ; //Brands [{}]
  
    
    ngOnInit(): void {
  
    
     
  
  // get Brands
  this._EcomdatapService.getBrands().subscribe({
    next: (response) => {
      this.brands = response.data;
      console.log('Error fetching Brands:',response);
    },
    error: (err) => {
      console.error('Error fetching Brands:', err);
    }
  
  })
  
  }

}
