import { ChangeDetectionStrategy, Component, OnInit, signal, viewChild } from '@angular/core';
import { AccountMovement, MOCK_MOVEMENTS } from '../../models/movement.model';
import { MovementListComponent } from '../../components/movement-list/movement-list.component';
import { BankCurrencyPipe } from '../../../../shared/pipes/bank-currency.pipe';
import { DatePipe } from '@angular/common';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-account-movements',
  standalone: true,
  imports: [MovementListComponent, BankCurrencyPipe, DatePipe, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './account-movements.component.html'
})
export class AccountMovementsComponent implements OnInit {
  movements = signal<AccountMovement[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  selectedMovement = signal<AccountMovement | null>(null);

  movementList = viewChild(MovementListComponent);

  ngOnInit(): void {
  this.isLoading.set(true);

  setTimeout(() => {
    // bug fix 2: convert date strings to Date objects
    this.movements.set(
      MOCK_MOVEMENTS.map(m => ({ ...m, date: new Date(m.date) }))
    );
    this.isLoading.set(false);
  }, 500);
}

  onMovementSelected(movement: AccountMovement): void {
  console.log('RECEIVED:', movement);
  this.selectedMovement.set(movement);
  console.log('SIGNAL VALUE:', this.selectedMovement());
}

  resetListFilter(): void {
    this.movementList()?.resetFilter();
    this.selectedMovement.set(null);
  }
}
