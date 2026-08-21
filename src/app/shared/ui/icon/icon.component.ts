import { Component, Input } from '@angular/core';

export type IconName =
  | 'dashboard'
  | 'movements'
  | 'analysis'
  | 'portfolio'
  | 'investments'
  | 'goals'
  | 'calendar'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'close'
  | 'search'
  | 'filter'
  | 'sort'
  | 'sort-up'
  | 'sort-down'
  | 'notifications'
  | 'settings'
  | 'profile'
  | 'plus'
  | 'support'
  | 'income'
  | 'expense'
  | 'transfer'
  | 'exchange';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  @Input({ required: true }) name!: IconName;
  @Input() size = 20;
}
