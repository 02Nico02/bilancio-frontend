import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { DASHBOARD_DATA_SOURCE } from './features/dashboard/dashboard.data-source';
import { DASHBOARD_MOCK_SUMMARY } from './features/dashboard/dashboard.mock';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    {
      provide: DASHBOARD_DATA_SOURCE,
      useValue: {
        load: () => DASHBOARD_MOCK_SUMMARY,
      },
    },
  ],
};
