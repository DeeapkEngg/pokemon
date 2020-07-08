import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { TilesComponent } from './component/common/tiles/tiles.component';
import { SharedDataService } from './service/shared-data.service';
import { PokemonFeedService } from './service/pokemon-feed.service';
import { FilterpokemonPipe } from './common/pipe/filterpokemon.pipe';
import { PokemonDetailComponent } from './component/pokemon-detail/pokemon-detail.component';
import { ProgressbarComponent } from './component/common/progressbar/progressbar.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { CreateProductComponent } from './component/create-product/create-product.component';
import { ProductListDetailComponent } from './component/product-list-detail/product-list-detail.component';
import { DetailsComponent } from './component/details/details.component';
import { LoaderComponent } from './common/loader/loader.component';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TilesComponent,
    FilterpokemonPipe,
    PokemonDetailComponent,
    ProgressbarComponent,
    ProductListComponent,
    CreateProductComponent,
    ProductListDetailComponent,
    DetailsComponent,
    LoaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PokemonFeedService, SharedDataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
