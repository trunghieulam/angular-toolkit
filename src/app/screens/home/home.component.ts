import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hasHeader = true;
  hasFooter = true;

  constructor(
    private translate: TranslateService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
  }

  greeting() {
    this.toast.success(
      this.translate.instant('home.greeting.message'),
      this.translate.instant('home.greeting')
    );
  }
}
