import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './shared/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgetpassComponent } from './components/forgetpass/forgetpass.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { OrdersComponent } from './components/orders/orders.component';
import { DetailscateComponent } from './components/detailscate/detailscate.component';
import { DetailsbrandComponent } from './components/detailsbrand/detailsbrand.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  {path: '',
    canActivate:[authGuard],
     component:BlankLayoutComponent, children:[
    {path: '', redirectTo: 'home' ,pathMatch: 'full' },
    {path: 'home', component:HomeComponent},
    {path: 'cart', component:CartComponent},
    {path: 'wishlist', component:WishlistComponent},
    {path: 'products', component:ProductsComponent},
    {path: 'brandes', component:BrandsComponent},
    {path: 'details/:id', component:DetailsComponent},
    {path: 'detailscate/:id', component:DetailscateComponent},
    {path: 'detailsbrand/:id', component:DetailsbrandComponent},
    {path: 'categories', component:CategoriesComponent},
    {path: 'allorders', component:AllordersComponent},
    {path: 'orders/:id', component:OrdersComponent},


  ]},
  {path: '', component:AuthLayoutComponent, children:[
    {path: 'login', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'forgetpass', component:ForgetpassComponent},

    {path: '**', component:NotfoundComponent},


  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
