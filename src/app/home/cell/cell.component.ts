import { Component, OnInit, Input, HostBinding, Output, EventEmitter, SimpleChanges, SimpleChange } from '@angular/core';
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

  private _cell = {
    id: -1,
    state: -1,
    static: false
  };
  @Input()
  set cell(cell: any) {
    this._cell = cell;
    this.performState();
  }

  get cell() {
    return this.cell;
  }

  get cellState() {
    return this._cell.state;
  }

  get isStatic() {
    return this._cell.static;
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

  putNutOnBoard() {
    if (this.cellState === -1) {
      this.endTurn.emit({
        id: this.id,
        mod: this.mod,
        turn: this.turn,
      });
    }
  }

  performState() {
    let turn = this.cellState;
    switch (turn) {
      case GAME_CONSTANTS.PLAY_TURN.RED_TURN:
        this.bindingColor = GAME_CONSTANTS.COLOR_NUTS.COLOR_RED;
        break;
      case GAME_CONSTANTS.PLAY_TURN.BLUE_TURN:
        this.bindingColor = GAME_CONSTANTS.COLOR_NUTS.COLOR_BLUE;
      default:
        break;
    }

    if (this.isStatic) {
      this.bindingHoverOpacity = 1;
      this.bindingSelfColor = this.bindingColor;
    }
  }
}
