import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '../../core/data/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formToggler = true;
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public error: any;

  constructor(private fb: FormBuilder,
              private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
        'username': [null, Validators.required],
        'password': [null, Validators.required]
    });
    this.registerForm = this.fb.group({
        'username': [null, Validators.required],
        'password': [null, Validators.required],
        'email': [null, Validators.required]
    });

  }

  toggleForm() {
    this.formToggler = !this.formToggler
    this.error = ''
  }

  login() {
    this.error = ''
    for (let c in this.loginForm.controls) {
      this.loginForm.controls[c].markAsTouched();
    }
    if (this.loginForm.valid) {
      let value = this.loginForm.value
      this.dataService.login(value).subscribe((res: any) => {
        this.dataService.setAuthData(res.token, value)
        this.router.navigate(['blog/'])
      }, (error: any) => {
        if (error.error && error.error.non_field_errors) {
          this.error = 'Не правильные имя пользователя или пароль'
        }
      })
    }
  }

  register() {
    this.error = ''
    for (let c in this.registerForm.controls) {
      this.registerForm.controls[c].markAsTouched();
    }
    if (this.registerForm.valid) {
      let value = this.registerForm.value
      this.dataService.registerUser(value).subscribe((res: any) => {
        this.dataService.setAuthData(res.token, value)
        this.router.navigate(['blog/'])
      }, (error: any) => {
        if (error.error) {
          for (let key in error.error) {
            this.error = error.error[key]
          }
        }
      })
    }
  }

  checkError(form, key) {
    let checker = form.controls[key].hasError('required') &&
                  (form.controls[key].dirty || form.controls[key].touched)
    if (checker) {
      return 'error-input'
    }
    return ''
  }

}
