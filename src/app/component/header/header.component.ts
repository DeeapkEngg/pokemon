import { Component, HostListener, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  displaySubList = true;
  searchData: string =  null;
  isAdmin: boolean;
  isProductListContainData = false;

  constructor(private head: SharedDataService,
              private userService: UserServiceService,
    ) { }


  ngOnInit(): void {
    this.userService.getProfile().subscribe((data: boolean) => {
     this.isAdmin = data;
    });

    this.head.getProduct().subscribe((data: boolean) => {
      this.isProductListContainData = data;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
      const size = event.target.innerWidth;
      if (size > 1000){
        this.displaySubList = true;
      } else {
        this.displaySubList = false;
      }
  }

searchFun(value: string){
   this.head.sendValue(value);
 }

toggleMenu(value: boolean){
    this.displaySubList = value;
  }
}
