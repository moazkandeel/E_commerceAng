import { Component, inject, OnInit } from '@angular/core';
import { CardService } from 'src/app/shared/interfaces/card.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit{

  constructor(private _AuthService:AuthService){}
  private readonly _CardService= inject(CardService);



  countNumber: number = 0;


  ngOnInit(): void {

    this._CardService.getUserCard().subscribe({
      next: (res) => {
        this._CardService.cartNumber.next(res.numOfCartItems);
      }
    });


    this._CardService.cartNumber.subscribe({
      next: (data) => {
        this.countNumber = data;
        console.log("عدد المنتجات في السلة:", data);
      }
    });

    // جلب العدد من السلة عند التحميل الأولي
    this._CardService.getUserCard().subscribe({
      next: (response) => {
        this._CardService.cartNumber.next(response.numOfCartItems);
      }
    });
  }



  logOutUser():void{

    this._AuthService.logOut();
  }

}
