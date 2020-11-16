import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  DEFAUL_EN = {
    code: 'en',
    name: 'lang.en',
    flagUrl: '../../assets/imgs/flags/en.svg'
  }

  selectedLanguage: any;

  languages = [{
    code: 'en',
    name: 'lang.en',
    flagUrl: '../../assets/imgs/flags/en.svg'
  }, {
    code: 'vi',
    name: 'lang.vi',
    flagUrl: '../../assets/imgs/flags/vi.svg'
  }, {
    code: 'no',
    name: 'lang.no',
    flagUrl: '../../assets/imgs/flags/no.svg'
  }];

  constructor(
    private translateService: TranslateService,
    private auth: AuthService,
    private router: Router
  ) {
    let language = localStorage.getItem('language');
    if (language) {
      let userLanguage = this.languages.filter(
        x => x.code == language
      );
      if (userLanguage.length > 0) {
        this.selectedLanguage = userLanguage[0];
        this.changeLanguage(this.selectedLanguage);
      }
    } else {
      this.selectedLanguage = this.DEFAUL_EN;
      localStorage.setItem('language', this.selectedLanguage.code);
    }
  }

  ngOnInit(): void {
  }

  changeLanguage(language: any) {
    if (!language) {
      language = this.DEFAUL_EN;
    }
    this.selectedLanguage = language;
    localStorage.setItem('language', language.code);
    this.translateService.use(language.code);
  }

  navigateTo(component = '') {
    if (component && component !== '') {
      this.router.navigate([component]);
    }
  }

  // You can test it by binding it to .btn-online button, <<  (click)="logout()"  >>
  // logout() {
  //   this.auth.logout();
  // }

  get isValidated() {
    return this.auth.isAuthenticated();
  }
}
