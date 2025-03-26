import { Component, OnDestroy, OnInit } from '@angular/core';
import { EcomdatapService } from './../../shared/services/ecomdatap.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CardService } from 'src/app/shared/interfaces/card.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  categories: any[] = [];
  searchTerm: string = '';
  subscriptions: Subscription[] = [];

  wishlist: Set<string> = new Set(); // استخدام Set لتجنب التكرار

  constructor(
    private _EcomdatapService: EcomdatapService,
    private _WishlistService: WishlistService,
    private _CardService: CardService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    // تحميل المنتجات
    const productSub = this._EcomdatapService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        console.log(response);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
    this.subscriptions.push(productSub);

    // تحميل الفئات (التصنيفات)
    const categorySub = this._EcomdatapService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
        console.log('Categories:', response);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
    this.subscriptions.push(categorySub);

    // تحميل قائمة الأمنيات من localStorage
    this.loadWishlistFromStorage();
  }

  // تحميل قائمة الأمنيات من localStorage
  loadWishlistFromStorage(): void {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      this.wishlist = new Set(JSON.parse(storedWishlist));
    }
  }

  // حفظ قائمة الأمنيات في localStorage
  saveWishlistToStorage(): void {
    localStorage.setItem('wishlist', JSON.stringify(Array.from(this.wishlist)));
  }

  // إضافة منتج إلى السلة
  addCars(id: string): void {
    const cardSub = this._CardService.addToCard(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success(response.message, "Fresh Cart");
        this._CardService.cartNumber.next(response.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.subscriptions.push(cardSub);
  }

  // إضافة / إزالة عنصر من قائمة الأمنيات
  addwashlist(id: string): void {
    const wishlistSub = this._WishlistService.addWishlist(id).subscribe({
      next: (response) => {
        console.log("Wishlist:", response);
        this._ToastrService.success(response.message, "Fresh Cart");
        this._WishlistService.cartNumber.next(response.numOfCartItems);

        // إضافة أو إزالة العنصر من قائمة الأمنيات
        if (this.wishlist.has(id)) {
          this.wishlist.delete(id);
        } else {
          this.wishlist.add(id);
        }

        // تحديث `localStorage`
        this.saveWishlistToStorage();
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.subscriptions.push(wishlistSub);
  }

  // التحقق مما إذا كان العنصر في قائمة الأمنيات
  isInWishlist(id: string): boolean {
    return this.wishlist.has(id);
  }

  // إلغاء الاشتراكات عند تدمير المكون لتجنب تسرب الذاكرة
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
