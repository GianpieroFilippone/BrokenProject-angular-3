import { Component } from '@angular/core';
import { AccountMovementsComponent } from './features/accounts/containers/account-movements/account-movements.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccountMovementsComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}
