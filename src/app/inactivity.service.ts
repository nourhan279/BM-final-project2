import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InactivityDialogComponent } from './inactivity-dialog/inactivity-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class InactivityService {
  private timeoutId: any;
  private readonly inactivityTime = 300000;
  private dialogRef: any;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private dialog: MatDialog
  ) {
    this.setupInactivityListener();
  }

  private setupInactivityListener() {
    const events = ['mousemove', 'keydown', 'click', 'keypress'];
    events.forEach((event) =>
      window.addEventListener(event, this.resetTimeout.bind(this))
    );
    this.resetTimeout();
  }

  private resetTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => this.logout(), this.inactivityTime);
  }

  private logout() {
    this.ngZone.run(() => {
      this.dialogRef = this.dialog.open(InactivityDialogComponent);
      // Handle the dialog close event
      this.dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['/logout']);
      });
    });
  }

  stopInactivityListener() {
    clearTimeout(this.timeoutId);
    const events = ['mousemove', 'keydown', 'click', 'keypress'];
    events.forEach((event) =>
      window.removeEventListener(event, this.resetTimeout.bind(this))
    );
  }
}
