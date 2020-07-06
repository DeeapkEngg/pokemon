import { Component, HostListener, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { PokemonFeedService } from 'src/app/service/pokemon-feed.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  
  displaySubList: boolean = false
  searchData: string =  null
  isAdmin:boolean
  isProductListContainData: boolean = false

  constructor(private head: SharedDataService, 
    private userService: UserServiceService,
    private pokemon: PokemonFeedService
    ) { }

  
  ngOnInit(): void {
    this.userService.getProfile().subscribe((data: boolean) => {
     this.isAdmin = data
    })

    this.pokemon.isProductList().subscribe((data: boolean) => {
      this.isProductListContainData  = data
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
      const size = event.target.innerWidth;
      if(size > 1000){
        this.displaySubList = true;
      } else {
        this.displaySubList = false;
      }
  }

searchFun(value: string){
    this.head.sendValue(value)
 }

toggleMenu(value: boolean){
    this.displaySubList = value
  }
}
