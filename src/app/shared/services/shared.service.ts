import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  loadingSpinnerSubject = new Subject<boolean>();

  public startLoading() {
    this.loadingSpinnerSubject.next(true);
  }

  public stopLoading() {
    this.loadingSpinnerSubject.next(false);
  }

  public getLoadingStatus(): Observable<boolean> {
    return this.loadingSpinnerSubject.asObservable();
  }
}
