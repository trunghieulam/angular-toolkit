import { Component, OnInit, Input, HostBinding, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { GAME_CONSTANTS } from 'src/app/constants/game.constants';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input() id = 0;
  @Input() state = 0;
  @Input() mod = 0; // defaul is single play
  
  _turn = 0;
  @Input()
  set turn(turn: number) {
    this._turn = turn;
    if (this.bindingColor === GAME_CONSTANTS.COLOR_NUTS.COLOR_WHITE) {
      switch (turn) {
        case GAME_CONSTANTS.PLAY_TURN.RED_TURN:
          this.bindingSelfColor = GAME_CONSTANTS.COLOR_NUTS.COLOR_RED;
          break;
        case GAME_CONSTANTS.PLAY_TURN.BLUE_TURN:
          this.bindingSelfColor = GAME_CONSTANTS.COLOR_NUTS.COLOR_BLUE;
        default:
          break;
      }
    }
  }
  get turn() {
    return this._turn;
  }

  @Output() endTurn: EventEmitter<any> = new EventEmitter();

  @HostBinding('style.--color') bindingColor;
  @HostBinding('style.--self-color') bindingSelfColor;
  @HostBinding('style.--hover-opacity') bindingHoverOpacity;

  constructor() {
    this.bindingColor = GAME_CONSTANTS.COLOR_NUTS.COLOR_WHITE;
    switch (this.turn) {
      case GAME_CONSTANTS.PLAY_TURN.RED_TURN:
        this.bindingSelfColor = GAME_CONSTANTS.COLOR_NUTS.COLOR_RED;
        break;
      case GAME_CONSTANTS.PLAY_TURN.BLUE_TURN:
        this.bindingSelfColor = GAME_CONSTANTS.COLOR_NUTS.COLOR_BLUE;
      default:
        this.bindingSelfColor = GAME_CONSTANTS.COLOR_NUTS.COLOR_WHITE;
        break;
    }
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
        case GAME_CONSTANTS.PLAY_TURN.RED_TURN:
          this.bindingColor = GAME_CONSTANTS.COLOR_NUTS.COLOR_RED;
          break;
        case GAME_CONSTANTS.PLAY_TURN.BLUE_TURN:
          this.bindingColor = GAME_CONSTANTS.COLOR_NUTS.COLOR_BLUE;
        default:
          break;
      }
      this.endTurn.emit({
        id: this.id,
        mod: this.mod,
        turn: this.turn,
      });
    }

    this.bindingHoverOpacity = 1;
    this.bindingSelfColor = this.bindingColor;
  }

}
