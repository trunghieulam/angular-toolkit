import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  COLOR_WHITE = '#ffffff';
  COLOR_RED = '#b71c1c';
  COLOR_BLUE = '#1a237e';

  @Input() id = 0;
  @Input() state = 0;

  @HostBinding('style.--color') bindingColor;

  constructor() {
  }

  ngOnInit(): void {
    // if (this.color) {
    //   this.color = this.COLOR_RED;
    //   this.bindingColor = this.COLOR_RED;
    // }
  }

  changeState() {
    if (this.state === 0) {
      this.bindingColor = this.COLOR_RED;
      this.state = 1;
    } else if (this.state === 1) {
      this.bindingColor = this.COLOR_BLUE;
      this.state = 2;
    } else {
      this.bindingColor = this.COLOR_WHITE;
      this.state = 0;
    }
  }

}
