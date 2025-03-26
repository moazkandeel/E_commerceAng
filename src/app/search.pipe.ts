import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './shared/interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(Products:Product[] , term:string): Product[] {
    return Products.filter((Product)=>
      Product.title.toLowerCase().includes(term.toLowerCase()) );
  }

}
