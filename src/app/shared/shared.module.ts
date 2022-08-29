import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { InvalidImageDirective } from './directives/invalid-image.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    AlertModalComponent,
    LoadingSpinnerComponent,
    InvalidImageDirective,
  ],
  imports: [RouterModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  exports: [
    CommonModule,
    HeaderComponent,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModalComponent,
    LoadingSpinnerComponent,
    InvalidImageDirective,
  ],
})
export class SharedModule {}
