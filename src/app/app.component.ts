import { Component, OnInit } from '@angular/core';
import { SharedDataService } from './service/shared-data.service';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  
  title = 'pokeman-portal';
  constructor(private head:SharedDataService, private router: Router ) {
 }
  ngOnInit(): void {
    this.router.events.subscribe((event: NavigationEvent): void => {
        this.head.sendValue('')
          
      
    });
  }

}
