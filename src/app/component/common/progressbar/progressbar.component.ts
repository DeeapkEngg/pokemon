import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {

  @Input() size: number;
  @Input() label: string;
  @Input() color: string;
  @Input() base: number;
  constructor() { }
  ngOnInit(): void {
  }

  getWidth(size: number){
    const percent = (100 - (Math.ceil(size / this.base * 100)));
    return `calc(100% - ${percent}px)`;
  }

}
