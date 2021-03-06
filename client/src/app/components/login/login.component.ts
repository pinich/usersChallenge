import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/service/authentication.service';
import { ConfirmPasswordValidator } from './confirm-password.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  regForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  active = 1; // 1 = login || 2 = register

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });

    this.regForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rePassword: ['', Validators.required],
      name: new FormControl('', [Validators.maxLength(300), Validators.required]),
      other: ['', Validators.maxLength(500)]
    }, {
      validator: ConfirmPasswordValidator('password', 'rePassword')
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  get g() { return this.regForm.controls; }

  //#region login
  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          this.resetForms();
        },
        error => {
          this.error = error;
          this.resetForms();
        });
  }
  private resetForms(): void {
    this.loading = false;
    this.submitted = false;
    this.loading = false;
  }
  //#endregion

  //#region register
  onSubmitRegister(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.regForm.invalid) {
      this.loading = false;
      return;
    }

    this.authenticationService.register(
      this.g.email.value,
      this.g.password.value,
      this.g.name.value,
      this.g.other.value
    ).pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          this.resetForms();
        },
        error => {
          this.error = error;
          this.resetForms();
        });
  }
  //#endregion
}
