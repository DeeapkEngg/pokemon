import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../app/component/home/home.component';
import { PokemonDetailComponent } from './component/pokemon-detail/pokemon-detail.component';
import { CreateProductComponent } from './component/create-product/create-product.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { AuthguardService } from './service/authguard.service';
import { ProductListGuardService } from './service/product-list-guard.service';
import { DetailsComponent } from './component/details/details.component';
import { ProductListDetailComponent } from './component/product-list-detail/product-list-detail.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent,
    children: [
      {path: 'detail', component: DetailsComponent,
        children: [
          {path: 'pokemon/:id', component: PokemonDetailComponent},
          {path: 'productList/:id', component: ProductListDetailComponent},
          {path: '**', redirectTo: '/home'}
        ]
       },
      { path : 'createProduct', component: CreateProductComponent, canActivate: [AuthguardService]},
      { path : 'productList', component: ProductListComponent, canActivate: [AuthguardService, ProductListGuardService]},
      {path: '**', redirectTo: '/home'}

    ]
  },
  {path: '**', redirectTo: '/home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
