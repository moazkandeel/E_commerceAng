import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CardService } from 'src/app/shared/interfaces/card.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, OnDestroy {
  wishlistDetails: any = [];
  wishlist: Set<string> = new Set(); // استخدام Set للتعامل مع العناصر بسهولة
  subscriptions: Subscription[] = [];

  constructor( private _WishlistService: WishlistService,private _CardService: CardService,private _ToastrService: ToastrService) {}

  ngOnInit(): void {
    this.loadWishlist();
    this.loadWishlistFromLocalStorage();
  }

  loadWishlist(): void {
    const wishlistSub = this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        console.log('Wishlist Data:', response);
        this.wishlistDetails = response.data || [];
      },
      error: (err) => {
        console.error('Error fetching wishlist:', err);
      }
    });
    this.subscriptions.push(wishlistSub);
  }


  ////////aad to cart///////
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

  addwashlist(id: string): void {
    const wishlistSub = this._WishlistService.addWishlist(id).subscribe({
      next: (response) => {
        console.log('Wishlist:', response);
        this._ToastrService.success(response.message, 'Fresh Cart');
        this._WishlistService.cartNumber.next(response.numOfCartItems);

        // تحديث حالة العنصر في قائمة الأمنيات
        if (this.wishlist.has(id)) {
          this.wishlist.delete(id);
        } else {
          this.wishlist.add(id);
        }

        // حفظ الحالة في localStorage
        this.saveWishlistToLocalStorage();
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.subscriptions.push(wishlistSub);
  }

  isInWishlist(id: string): boolean {
    return this.wishlist.has(id);
  }

  removeWishlist(id: string): void {
    console.log('Trying to remove item with ID:', id);

    const removeSub = this._WishlistService.removeItem(id).subscribe({
      next: (response) => {
        console.log('Item removed successfully:', response);
        
        // إزالة العنصر من القائمة
        this.wishlist.delete(id);
        
        // حفظ التحديث في localStorage
        this.saveWishlistToLocalStorage();

        // تحديث القائمة
        this.loadWishlist();
      },
      error: (err) => {
        console.error('Error removing item:', err);
      }
    });
    this.subscriptions.push(removeSub);
  }

  // ✅ تحميل القائمة من `localStorage`
  loadWishlistFromLocalStorage(): void {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      this.wishlist = new Set(JSON.parse(storedWishlist));
    }
  }

  // ✅ حفظ القائمة في `localStorage`
  saveWishlistToLocalStorage(): void {
    localStorage.setItem('wishlist', JSON.stringify(Array.from(this.wishlist)));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
