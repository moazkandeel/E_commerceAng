import { Component, OnDestroy, OnInit } from '@angular/core';
import { EcomdatapService } from './../../shared/services/ecomdatap.service';
import { Product } from 'src/app/shared/interfaces/product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CardService } from 'src/app/shared/interfaces/card.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit ,OnDestroy {

  constructor(private _EcomdatapService: EcomdatapService  , private _CardService:CardService,private _WishlistService:WishlistService , private _ToastrService:ToastrService ) {}

  products: any[] =  []  ; //Product [{}]
  categories: any[] =  []  ; //categories [{}]
  searchTerm:string = '' ;
  getAllProductSub !: Subscription;



  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    dots: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };



//card




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

addwashlist(id: string): void {
  this._WishlistService.addWishlist(id).subscribe({
    next: (response) => {
      console.log(response);

      this._ToastrService.success(response.message , "Fresh Cart");

      // تحديث العدد في BehaviorSubject
      this._WishlistService.cartNumber.next(response.numOfCartItems);
    },
    error: (err) => {
      console.log(err);
    }
  });
}





ngOnDestroy(): void {
  this.getAllProductSub?.unsubscribe()
 }






  ngOnInit(): void {

    // get all Product
   this.getAllProductSub = this._EcomdatapService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        console.log(response);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });

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
