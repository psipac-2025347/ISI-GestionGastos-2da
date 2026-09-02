import { Component } from '@angular/core';
import { IncomeModuleComponent } from '../income-module/income-module.component';

@Component({
  selector: 'app-sueldo-fijo',
  standalone: true,
  imports: [IncomeModuleComponent],
  template: `<app-income-module type="FIJO" title="Sueldo Fijo"></app-income-module>`,
})
export class SueldoFijoComponent {}