import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { faTshirt } from '@fortawesome/free-solid-svg-icons';

import en from '../assets/i18n/en.json';
import vi from '../assets/i18n/vi.json';
import no from '../assets/i18n/no.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-toolkits';
  hasHeader = true;
  hasFooter = true;

  faTshirt = faTshirt;

  constructor(
    private translate: TranslateService,
  ) {
    this.translate.setTranslation('en', en);
    this.translate.setTranslation('vi', vi);
    this.translate.setTranslation('no', no);
    this.translate.setDefaultLang('en');

    this.translate.use('en');
  }

  onActivate(event: any = {}) {
    this.hasHeader = event.hasHeader;
    this.hasFooter = event.hasFooter;
  }

  onDeactivate(event: any = {}) {
    this.hasHeader = true;
    this.hasFooter = true;
  }
}
