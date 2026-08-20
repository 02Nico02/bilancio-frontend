import { HostListener, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

type NavItem = {
  label: string;
  path: string;
  icon: string;
};

type FutureItem = {
  label: string;
  icon: string;
  note: string;
};

@Component({
  selector: 'app-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
})
export class AppShellComponent {
  protected readonly sidebarOpen = signal(false);

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

  protected readonly utilityNav: NavItem[] = [
    { label: 'Configuración', path: '/dashboard', icon: 'settings' },
    { label: 'Soporte', path: '/dashboard', icon: 'support' },
  ];

  @HostListener('document:keydown.escape')
  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  openSidebar(): void {
    this.sidebarOpen.set(true);
  }

  closeOnNavigate(): void {
    this.sidebarOpen.set(false);
  }

  toggleSidebar(): void {
    this.sidebarOpen.update((current) => !current);
  }
}
