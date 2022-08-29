import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: '', pathMatch: 'full', redirectTo: 'login' },
    ],
  },
];

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule],
})
export class AuthModule {}
