import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent {
  @Input() eyebrow?: string;
  @Input({ required: true }) title!: string;
  @Input() description?: string;
}
