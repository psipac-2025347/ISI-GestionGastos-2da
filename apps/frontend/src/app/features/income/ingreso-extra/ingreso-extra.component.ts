import { Component } from '@angular/core';
import { IncomeModuleComponent } from '../income-module/income-module.component';

@Component({
  selector: 'app-ingreso-extra',
  standalone: true,
  imports: [IncomeModuleComponent],
  template: `<app-income-module type="EXTRA" title="Ingreso Extra"></app-income-module>`,
})
export class IngresoExtraComponent {}