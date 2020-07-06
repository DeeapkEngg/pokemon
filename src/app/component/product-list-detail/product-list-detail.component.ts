import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonFeedService } from 'src/app/service/pokemon-feed.service';
import { Product } from 'src/app/service/PokemonFeedSchema';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-product-list-detail',
  templateUrl: './product-list-detail.component.html',
  styleUrls: ['./product-list-detail.component.scss']
})
export class ProductListDetailComponent implements OnInit {
  product: Product
  constructor(
      private route: ActivatedRoute, 
      private router: Router,
      private user : UserServiceService,
      private pokemon: PokemonFeedService) { }

  ngOnInit(): void {
      this.route.params.subscribe((item: any) => {

        if(this.pokemon.productList && this.user.isAdmin){
          this.product = this.pokemon.productList[Number(item.id)]

        } else {
          this.router.navigate(["home"])
        }
      })
  }
}
