import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../shared/ui/page-header/page-header.component';
import { PanelComponent } from '../../shared/ui/panel/panel.component';

@Component({
  selector: 'app-movements-page',
  imports: [PageHeaderComponent, PanelComponent],
  templateUrl: './movements-page.component.html',
  styleUrl: './movements-page.component.scss',
})
export class MovementsPageComponent {}

