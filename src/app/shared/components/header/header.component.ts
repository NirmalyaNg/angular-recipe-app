import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  subscriptions = new Subscription();
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.userSubject.subscribe((user) => {
        this.isAuthenticated = !!user;
      })
    );
  }

  handleLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
