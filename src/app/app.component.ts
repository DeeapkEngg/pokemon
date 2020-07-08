import { Component, OnInit } from '@angular/core';
import { SharedDataService } from './service/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private share: SharedDataService) {
 }

  title = 'pokeman-portal';
  ngOnInit(): void {
    const data =  window.localStorage.getItem('productList');
    const ch = data ? true : false;
    setTimeout(() => this.share.sendProductCacheValue(ch), 0);
  }


}
