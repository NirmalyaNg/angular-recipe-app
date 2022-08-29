import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AuthContants } from '../../constants/auth.constants';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup | undefined;
  error = null;
  subscriptions = new Subscription();

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  get f() {
    return this.loginForm;
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  public handleLogin(): void {
    if (this.loginForm!.invalid) {
      return;
    }
    this.error = null;
    this.sharedService.startLoading();
    const email = this.loginForm!.value.email;
    const password = this.loginForm!.value.password;
    this.subscriptions.add(
      this.authService.login(email, password).subscribe({
        next: (res) => {
          this.sharedService.stopLoading();
          this.router.navigate(['recipes']);
        },
        error: (error) => {
          this.sharedService.stopLoading();
          this.error = error;
        },
      })
    );
  }

  public isInvalidControl(controlName: string) {
    return (
      this.loginForm!.get(controlName)!.touched &&
      this.loginForm!.get(controlName)!.invalid
    );
  }

  public getEmailControlError(): string | undefined {
    if (this.f!.get('email')!.errors!['required']) {
      return AuthContants.EMAIL_REQUIRED_ERROR;
    }
    if (this.f!.get('email')!.errors!['email']) {
      return AuthContants.EMAIL_INVALID_ERROR;
    }
    return;
  }

  public getPasswordControlError(): string | undefined {
    if (this.f!.get('password')!.errors!['required']) {
      return AuthContants.PASSWORD_REQUIRED_ERROR;
    }
    if (this.f!.get('password')!.errors!['minlength']) {
      return AuthContants.PASSWORD_INVALID_ERROR;
    }
    return;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private createLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
}
