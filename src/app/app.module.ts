import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DetailsComponent } from './components/details/details.component';
import { NavBlankComponent } from './components/nav-blank/nav-blank.component';
import { NavAuthComponent } from './components/nav-auth/nav-auth.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BuyPipe } from './buy.pipe';
import { SearchPipe } from './search.pipe';
import { ToastrModule } from 'ngx-toastr';
import { ForgetpassComponent } from './components/forgetpass/forgetpass.component';
import { LoginComponent } from './components/login/login.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { OrdersComponent } from './components/orders/orders.component';
import { DetailscateComponent } from './components/detailscate/detailscate.component';
import { DetailsbrandComponent } from './components/detailsbrand/detailsbrand.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

 @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    FooterComponent,
    CategoriesComponent,
    BrandsComponent,
    RegisterComponent,
    NotfoundComponent,
    DetailsComponent,
    NavBlankComponent,
    NavAuthComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    BuyPipe,
    SearchPipe,
    LoginComponent,
    AllordersComponent,
    OrdersComponent,
    DetailscateComponent,
    DetailsbrandComponent,
    WishlistComponent,
   
    
  ],
  imports: [
    ForgetpassComponent,
    SlickCarouselModule, // ✅ استيراد `ngx-slick-carousel` هنا
    ToastrModule.forRoot(), // ✅ استيراد `ngx-toastr`
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot() // ToastrModule added

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
