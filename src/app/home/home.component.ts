import { Component, OnInit, HostBinding } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { faCog, faRedo } from '@fortawesome/free-solid-svg-icons';
import { GAME_CONSTANTS } from '../constants/game.constants';

function has4Nuts(array = [], matched = GAME_CONSTANTS.PLAY_TURN.RED_TURN, MAXBOUND = 4) {
  if (array.length < MAXBOUND) {
    return false;
  }

  let count = 0;
  for (let i = 0; i < array.length; i++) {
    let it = array[i];
    if (it === matched) {
      count++;
      if (count >= MAXBOUND) {
        return true;
      }
    } else {
      count = 0;
    }
  }
  return false;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hasHeader = true;
  hasFooter = true;

  faCog = faCog;
  faRedo = faRedo;

  /* SETTINGS */
  openedSetting = false;

  /* CONTROLS */
  gridCells = [];
  DEFAULT_GRID = {
    id: 0,
    col: 7,
    row: 6
  };
  selectedGrid: {
    id: number,
    col: number,
    row: number
  };
  gridOptions = [{
    id: 0,
    col: 7,
    row: 6
  },{
    id: 1,
    col: 5,
    row: 4
  },{
    id: 2,
    col: 6,
    row: 5
  },{
    id: 3,
    col: 8,
    row: 7
  },{
    id: 4,
    col: 9,
    row: 7
  },{
    id: 5,
    col: 10,
    row: 7
  },{
    id: 5,
    col: 8,
    row: 8
  }];

  selectedMod: {
    id: number,
    name: string
  };
  mods = [];

  turn = 0;

  @HostBinding('style.--rows') bindingRows;
  isFalling = false;

  constructor(
    private translate: TranslateService,
    private toast: ToastrService
  ) {
    this.selectedGrid = this.DEFAULT_GRID;
    this.mods.push(...[GAME_CONSTANTS.PLAY_MODS.DEBUG_MODE, GAME_CONSTANTS.PLAY_MODS.DUAL_PLAY]);
    this.selectedMod = GAME_CONSTANTS.PLAY_MODS.DUAL_PLAY;
  }

  ngOnInit(): void {
    this.initGrid();
  }

  initGrid(grid = this.DEFAULT_GRID) {
    this.gridCells = new Array(grid.col * grid.row);
    this.bindingRows = grid.row;
    for (let i = 0; i < grid.col * grid.row; i++) {
      this.gridCells[i] = { id: i };
      if (this.selectedMod == GAME_CONSTANTS.PLAY_MODS.DUAL_PLAY) {
        this.gridCells[i]['state'] = -1;
      }
    }
  }

  changeGridSize(option = null) {
    if (!option) {
      return;
    }

    this.selectedGrid = option;
    this.initGrid(option);
    this.openedSetting = false;
  }

  changeMod(mod = null) {
    if (!mod) {
      return;
    }

    this.selectedMod = mod;
    this.changeGridSize(this.selectedGrid);
    this.openedSetting = false;
  }

  displaySetting() {
    this.openedSetting = !this.openedSetting;
  }

  checkTurnEnd(id) {
    let cell = this.gridCells[id];
    if (this.checkAll()) {
      this.isMatched(cell.id, cell.state);
    }
  }

  onTurnEnd(event) {
    if (this.isFalling) {
      return;
    }

    this.turn = (event.turn + 1) % 2;
    let cell = {
      id: event.id,
      state: event.turn
    };
    this.gridCells[event.id] = cell;
    let id = event.id;
    let result = this.dropNutOnColumn(id);
    this.isFalling = true;
    if (result) {
      let fallingAnimationInterval = setInterval(
        () => {
          if (result) {
            id++;
            result = this.dropNutOnColumn(id);
          } else {
            this.setStaticNut(id);
            clearInterval(fallingAnimationInterval);
          }
        }, 110
      );
    } else {
      this.setStaticNut(id);
    }
  }

  setStaticNut(id) {
    this.isFalling = false;
    this.checkTurnEnd(id);
    this.gridCells[id] = {
      id: this.gridCells[id].id,
      state: this.gridCells[id].state,
      static: true
    }
  }

  dropNutOnColumn(id = -1) {
    if (id == -1) {
      return false;
    }

    let topV = Math.floor(id / this.selectedGrid.row) * this.selectedGrid.row;
    let endV = topV + this.selectedGrid.row;
    let nextId = id + 1;

    if (this.gridCells[id].state === -1 || nextId == endV || this.gridCells[nextId].state !== -1) {
      return false;
    } else {
      let cell = {
        id,
        state: -1
      }
      let belowCell = {
        id: nextId,
        state: this.gridCells[id].state
      }
      this.gridCells[id] = cell;
      this.gridCells[nextId] = belowCell;
      return true;
    }
  }

  checkAll() {
    let minusOneNumber = this.gridCells.filter(
      (cell: any) => {
        return cell.state == -1;
      }
    ).length;
    if (minusOneNumber <= 0) {
      this.toast.success(this.translate.instant('home.no-win'), this.translate.instant('home.final'));
      this.initGrid(this.selectedGrid);
      return false;
    }

    return true;
  }

  isMatched(index, turn = GAME_CONSTANTS.PLAY_TURN.RED_TURN) {
    // there is a small number so just check the whole row and col with 2 diagonal lines of its index

    if (!index) {
      return;
    }

    let horizontal = [];
    let vertical = [];
    let diagonalR = [];
    let diagonalL = [];

    let topV = Math.floor(index / this.selectedGrid.row) * this.selectedGrid.row;
    let endV = topV + this.selectedGrid.row;
    for (let i = topV; i < endV; i++){
      horizontal.push(this.gridCells[i].state)
    }

    let leftH = Math.floor(index % this.selectedGrid.row);
    for (let i = 0; i < this.selectedGrid.col; i++) {
      vertical.push(this.gridCells[leftH + i * this.selectedGrid.row].state);
    }

    let xAxisR = topV / this.selectedGrid.row;
    let yAxisR = leftH;
    while (xAxisR !== 0 && yAxisR !== 0) {
      xAxisR--;
      yAxisR--;
    }
    while (xAxisR < this.selectedGrid.col && yAxisR < this.selectedGrid.row) {
      diagonalR.push(this.gridCells[yAxisR + xAxisR * this.selectedGrid.row].state);
      xAxisR++;
      yAxisR++;
    }

    let xAxisL = topV / this.selectedGrid.row;
    let yAxisL = leftH;
    while (xAxisL < this.selectedGrid.col - 1 && yAxisL !== 0) {
      xAxisL++;
      yAxisL--;
    }
    while (xAxisL >= 0 && yAxisL < this.selectedGrid.row) {
      diagonalL.push(this.gridCells[xAxisL * this.selectedGrid.row + yAxisL].state);
      xAxisL--;
      yAxisL++;
    }

    if (
        has4Nuts(horizontal, turn) ||
        has4Nuts(vertical, turn) ||
        has4Nuts(diagonalR, turn) ||
        has4Nuts(diagonalL, turn)
      ) {
      this.endMatch(turn);
    }
  }

  endMatch(winner = GAME_CONSTANTS.PLAY_TURN.RED_TURN) {
    if (winner === GAME_CONSTANTS.PLAY_TURN.RED_TURN) {
      this.toast.error(this.translate.instant('home.red-win'), this.translate.instant('home.end-game'));
    } else {
      this.toast.info(this.translate.instant('home.blue-win'), this.translate.instant('home.end-game'));
    }
    this.initGrid(this.selectedGrid);
  }

  refresh() {
    this.initGrid(this.selectedGrid);
  }

  get currentMod() {
    return this.selectedMod.id;
  }
}
