import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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

  loginForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
  });

  constructor(
    private translateService: TranslateService,
    private auth: AuthService
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

  onSubmit() {
    this.auth.login(
      this.loginForm.getRawValue()
    );
  }

  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }
}
