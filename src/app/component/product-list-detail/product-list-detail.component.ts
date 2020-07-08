import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonFeedService } from 'src/app/service/pokemon-feed.service';
import { Product } from 'src/app/service/PokemonFeedSchema';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list-detail',
  templateUrl: './product-list-detail.component.html',
  styleUrls: ['./product-list-detail.component.scss']
})
export class ProductListDetailComponent implements OnInit, OnDestroy {
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private user: UserServiceService,
      private pokemon: PokemonFeedService) { }
  product: Product;
  destroyer: Subscription;
  ngOnDestroy(): void {
    this.destroyer.unsubscribe();
  }

  ngOnInit(): void {
      this.destroyer = this.route.params.subscribe((item: any) => {

        if (this.pokemon.productList && this.user.isAdmin){
          this.product = this.pokemon.productList[Number(item.id)];

        } else {
          this.router.navigate(['home']);
        }
      });
  }
}
