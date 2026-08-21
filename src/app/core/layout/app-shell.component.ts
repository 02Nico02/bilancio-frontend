import { HostListener, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import type { IconName } from '../../shared/ui/icon/icon.component';

type NavItem = {
  label: string;
  path: string;
  icon: IconName;
};

type FutureItem = {
  label: string;
  icon: IconName;
  note: string;
};

@Component({
  selector: 'app-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, IconComponent],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
})
export class AppShellComponent {
  protected readonly sidebarOpen = signal(false);
  protected readonly selectedPeriodLabel = 'Este mes';

  protected readonly primaryNav: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { label: 'Movimientos', path: '/movimientos', icon: 'movements' },
    { label: 'Análisis', path: '/analisis/flujo-gastos', icon: 'analysis' },
  ];

  protected readonly futureNav: FutureItem[] = [
    { label: 'Patrimonio', icon: 'portfolio', note: 'Próximamente' },
    { label: 'Inversiones', icon: 'investments', note: 'Próximamente' },
    { label: 'Objetivos', icon: 'goals', note: 'Próximamente' },
  ];

  protected readonly utilityNav: Array<{ label: string; icon: IconName }> = [
    { label: 'Configuración', icon: 'settings' },
    { label: 'Soporte', icon: 'support' },
  ];

  @HostListener('document:keydown.escape')
  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  closeOnNavigate(): void {
    this.sidebarOpen.set(false);
  }

  toggleSidebar(): void {
    this.sidebarOpen.update((current) => !current);
  }
}
