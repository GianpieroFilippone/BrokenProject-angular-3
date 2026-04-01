import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bankCurrency',
  standalone: true
})
export class BankCurrencyPipe implements PipeTransform {
  private formatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  transform(value: number): string {
    return this.formatter.format(value);
  }
}
