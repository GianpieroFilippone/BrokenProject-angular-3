import { Component, OnInit, signal, viewChild } from '@angular/core';
import { AccountMovement, MOCK_MOVEMENTS } from '../../models/movement.model';
import { MovementListComponent } from '../../components/movement-list/movement-list.component';
import { BankCurrencyPipe } from '../../../../shared/pipes/bank-currency.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-account-movements',
  standalone: true,
  imports: [MovementListComponent, BankCurrencyPipe, DatePipe],
  templateUrl: './account-movements.component.html'
})
export class AccountMovementsComponent implements OnInit {
  // State signals
  movements = signal<AccountMovement[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  selectedMovement = signal<AccountMovement | null>(null);

  // viewChild per chiamare resetFilter() sul figlio
  movementList = viewChild(MovementListComponent);

  ngOnInit(): void {
    this.isLoading.set(true);
    // Simula una chiamata HTTP con 500ms di ritardo
    setTimeout(() => {
      this.movements.set(MOCK_MOVEMENTS);
      this.isLoading.set(false);
    }, 500);
  }

  onMovementSelected(movement: AccountMovement): void {
    this.selectedMovement.set(movement);
  }

  resetListFilter(): void {
    this.movementList()?.resetFilter();
    this.selectedMovement.set(null);
  }
}
