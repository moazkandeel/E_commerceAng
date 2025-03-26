import { Component } from '@angular/core';
import { EcomdatapService } from './../../shared/services/ecomdatap.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

 constructor(private _EcomdatapService: EcomdatapService  ) {}

 categories: any[] =  []  ; //categories [{}]

  
  ngOnInit(): void {

  
   

// get categories
this._EcomdatapService.getCategories().subscribe({
  next: (response) => {
    this.categories = response.data;
    console.log('Error fetching categories:',response);
  },
  error: (err) => {
    console.error('Error fetching categories:', err);
  }

})

}
}