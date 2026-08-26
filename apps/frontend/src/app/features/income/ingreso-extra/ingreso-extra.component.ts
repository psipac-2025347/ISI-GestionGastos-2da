import { Component } from '@angular/core';

@Component({
  selector: 'app-ingreso-extra',
  standalone: true,
  imports: [],
  template: `
    <div class="placeholder">
      <h2>Ingreso Extra</h2>
      <p>✅ La navegación funciona correctamente. Esta sección se construirá en la etapa 3 del proyecto.</p>
    </div>
  `,
  styles: [`
    .placeholder { background:#fff; border-radius:10px; padding:2rem; max-width:500px; margin:1rem auto; text-align:center; box-shadow:0 4px 10px rgba(0,0,0,0.2); }
    h2 { color:#2E7D32; margin-top:0; }
    p { color:#2B2B2B; }
  `],
})
export class IngresoExtraComponent {}