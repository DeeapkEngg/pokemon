import { Component, OnInit } from '@angular/core';
import { PokemonFeedService } from 'src/app/service/pokemon-feed.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList: Array<object>;
  link = '../../home/detail/productList';
  constructor(private pokemonfeed: PokemonFeedService) { }

  ngOnInit(): void {
    this.productList = this.pokemonfeed.productList || this.pokemonfeed.getData();
  }

}
