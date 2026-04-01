import { Component, input, output, signal, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AccountMovement } from '../../models/movement.model';
import { BankCurrencyPipe } from '../../../../shared/pipes/bank-currency.pipe';

@Component({
  selector: 'app-movement-list',
  standalone: true,
  imports: [DatePipe, BankCurrencyPipe],
  templateUrl: './movement-list.component.html',
  styleUrl: './movement-list.component.scss'
})
export class MovementListComponent {
  // Inputs (signal-based)
  movements = input<AccountMovement[]>([]);
  isLoading = input<boolean>(false);
  error = input<string | null>(null);

  // Output
  movementSelected = output<AccountMovement>();

  // Internal filter state
  filter = signal<'ALL' | 'CREDIT' | 'DEBIT'>('ALL');

  // Computed: lista filtrata in base al filter signal
  filteredMovements = computed(() => {
    const currentFilter = this.filter();
    const allMovements = this.movements();
    if (currentFilter === 'ALL') {
      return allMovements;
    }
    return allMovements.filter(m => m.type === currentFilter);
  });

  setFilter(value: 'ALL' | 'CREDIT' | 'DEBIT'): void {
    this.filter.set(value);
  }

  /** Esposto per viewChild del padre */
  resetFilter(): void {
    this.filter.set('ALL');
  }

  selectMovement(movement: AccountMovement): void {
    this.movementSelected.emit(movement);
  }
}
