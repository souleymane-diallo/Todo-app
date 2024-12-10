import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { BASE_URL_TOKEN } from './tokens/base-url.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    {
      provide: BASE_URL_TOKEN,
      useValue: 'http://localhost:3000',
    },
    provideRouter(routes)]
};
