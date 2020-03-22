import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { GAME_CONSTANTS } from 'src/app/constants/game.constants';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  COLOR_WHITE = '#ffffff';
  COLOR_RED = '#b71c1c';
  COLOR_BLUE = '#1a237e';

  RED_TURN = 0;
  BLUE_TURN = 1;

  SINGLE_PLAY = 0;
  DUAL_PLAY = 1;

  @Input() id = 0;
  @Input() state = 0;
  @Input() mod = 0; // defaul is single play
  @Input() turn = 0;

  @Output() endTurn: EventEmitter<any> = new EventEmitter();

  @HostBinding('style.--color') bindingColor;

  constructor() {
    this.bindingColor = GAME_CONSTANTS.COLOR_NUTS.COLOR_WHITE;
  }

  ngOnInit(): void {
  }

  changeState() {
    if (this.mod === GAME_CONSTANTS.PLAY_MODS.SINGLE_PLAY.id) {
      if (this.state === 0) {
        this.bindingColor = GAME_CONSTANTS.COLOR_NUTS.COLOR_RED;
        this.state = 1;
      } else if (this.state === 1) {
        this.bindingColor = GAME_CONSTANTS.COLOR_NUTS.COLOR_BLUE;
        this.state = 2;
      } else {
        this.bindingColor = GAME_CONSTANTS.COLOR_NUTS.COLOR_WHITE;
        this.state = 0;
      }
    } else if (this.mod === GAME_CONSTANTS.PLAY_MODS.DUAL_PLAY.id && this.bindingColor == GAME_CONSTANTS.COLOR_NUTS.COLOR_WHITE) {
      switch (this.turn) {
        case this.RED_TURN:
          this.bindingColor = GAME_CONSTANTS.COLOR_NUTS.COLOR_RED;
          break;
        case this.BLUE_TURN:
          this.bindingColor = GAME_CONSTANTS.COLOR_NUTS.COLOR_BLUE;
        default:
          break;
      }
      this.endTurn.emit({
        mod: this.mod,
        turn: this.turn,
      });
    }
  }

}
