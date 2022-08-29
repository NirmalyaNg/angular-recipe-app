import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { SharedService } from './shared/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadingSpinner$: Observable<boolean> | undefined;

  constructor(
    private authService: AuthService,
    private shraredService: SharedService
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.loadingSpinner$ = this.shraredService.getLoadingStatus();
  }
}
