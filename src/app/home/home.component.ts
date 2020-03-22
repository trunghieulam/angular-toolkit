import { Component, OnInit, HostBinding } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hasHeader = true;
  hasFooter = true;

  faCog = faCog;

  /* SETTINGS */
  openedSetting = false;

  /* CONTROLS */
  gridCells = [];

  DEFAULT_GRID = {
    id: 0,
    col: 7,
    row: 6
  }

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
  }]

  @HostBinding('style.--rows') bindingRows;

  constructor(
    private translate: TranslateService,
    private toast: ToastrService
  ) {
    this.selectedGrid = this.DEFAULT_GRID;
  }

  ngOnInit(): void {
    this.initGrid();
  }
  


  initGrid(grid = this.DEFAULT_GRID) {
    this.gridCells = new Array(grid.col * grid.row);
    this.bindingRows = grid.row;
    for (let i = 0; i < grid.col * grid.row; i++) {
      this.gridCells[i] = { id: i + 1 };
    }
  }

  changeGridSize(option = null) {
    if (!option) {
      return;
    }

    this.selectedGrid = option;
    this.initGrid(option);
  }

  displaySetting() {
    this.openedSetting = !this.openedSetting;
  }
}
