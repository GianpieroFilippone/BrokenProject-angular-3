import { ChangeDetectionStrategy, Component, OnInit, signal, viewChild, computed } from '@angular/core';
import { AccountMovement, MOCK_MOVEMENTS } from '../../models/movement.model';
import { MovementListComponent } from '../../components/movement-list/movement-list.component';
import { BankCurrencyPipe } from '../../../../shared/pipes/bank-currency.pipe';
import { DatePipe, JsonPipe } from '@angular/common';

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

  // Legge i movimenti filtrati dal figlio tramite viewChild
  filteredMovements = computed(() => this.movementList()?.filteredMovements() ?? []);

  ngOnInit(): void {
    this.isLoading.set(true);
    setTimeout(() => {
      this.movements.set(
        MOCK_MOVEMENTS.map(m => ({ ...m, date: new Date(m.date) }))
      );
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

  // Genera e scarica il CSV
  exportCsv(): void {
    const movements = this.filteredMovements();
    if (!movements.length) return;

    const header = 'Data,Descrizione,Tipo,Importo';
    const rows = movements.map(m => {
      const date = new Date(m.date).toLocaleDateString('it-IT');
      const description = `"${m.description.replace(/"/g, '""')}"`;
      const type = m.type === 'CREDIT' ? 'Entrata' : 'Uscita';
      const amount = m.amount.toFixed(2).replace('.', ',');
      return `${date},${description},${type},${amount}`;
    });

    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'movimenti.csv';
    link.click();

    URL.revokeObjectURL(url);
  }
}