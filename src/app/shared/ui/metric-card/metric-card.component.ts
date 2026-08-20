import { Component, Input } from '@angular/core';
import type { FinancialTone } from '../../../features/dashboard/dashboard.models';

@Component({
  selector: 'app-metric-card',
  templateUrl: './metric-card.component.html',
  styleUrl: './metric-card.component.scss',
})
export class MetricCardComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: string;
  @Input() caption?: string;
  @Input() tone: FinancialTone = 'neutral';
  @Input() toneLabel?: string;
  @Input() trend?: string;
}
