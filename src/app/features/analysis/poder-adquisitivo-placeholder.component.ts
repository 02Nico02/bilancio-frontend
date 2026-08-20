import { Component } from '@angular/core';
import { PanelComponent } from '../../shared/ui/panel/panel.component';

@Component({
  selector: 'app-analysis-purchasing-power-placeholder',
  imports: [PanelComponent],
  template: `
    <app-panel
      eyebrow="Poder Adquisitivo"
      title="Detalle en construcción"
      description="La ruta ya existe para que el dashboard pueda navegar hacia esta vista."
    >
      <p class="placeholder-copy">
        Más adelante concentrará sueldo de referencia, inflación, tipo de cambio y comparación real.
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
export class PurchasingPowerPlaceholderComponent {}

