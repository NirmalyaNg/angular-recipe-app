import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  subscription = new Subscription();
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authService.userSubject.subscribe((user) => {
        this.isAuthenticated = !!user;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
