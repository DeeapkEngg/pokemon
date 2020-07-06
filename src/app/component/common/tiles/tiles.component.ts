import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})
export class TilesComponent implements OnInit {

  constructor() { }
  @Input() name: string;
  @Input() id: string;
  @Input() imagePath: string;
  @Input() link: string;
  ngOnInit(): void {
  }

}
