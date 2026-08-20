import { Component } from '@angular/core';
import { PanelComponent } from '../../shared/ui/panel/panel.component';

@Component({
  selector: 'app-analysis-flow-gastos-placeholder',
  imports: [PanelComponent],
  template: `
    <app-panel
      eyebrow="Flujo y Gastos"
      title="Detalle en construcción"
      description="Esta ruta queda activa para validar navegación y será reemplazada por el análisis profundo."
    >
      <p class="placeholder-copy">
        La versión final mostrará categorías, concentración, cambios mensuales y contexto por moneda.
      </p>
    </app-panel>
  `,
  styles: [
    `
      .placeholder-copy {
        margin: 0;
        color: var(--color-text-secondary);
        line-height: 1.6;
      }
    `,
  ],
})
export class FlowGastosPlaceholderComponent {}

