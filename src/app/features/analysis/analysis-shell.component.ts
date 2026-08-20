import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PageHeaderComponent } from '../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-analysis-shell',
  imports: [PageHeaderComponent, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './analysis-shell.component.html',
  styleUrl: './analysis-shell.component.scss',
})
export class AnalysisShellComponent {}

