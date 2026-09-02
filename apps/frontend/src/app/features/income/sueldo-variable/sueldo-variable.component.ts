import { Component } from '@angular/core';
import { IncomeModuleComponent } from '../income-module/income-module.component';

@Component({
  selector: 'app-sueldo-variable',
  standalone: true,
  imports: [IncomeModuleComponent],
  template: `<app-income-module type="VARIABLE" title="Sueldo Variable"></app-income-module>`,
})
export class SueldoVariableComponent {}