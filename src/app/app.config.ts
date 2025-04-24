import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './routing-strategy/custom-reuse-strategy.routing';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy},
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(),
    provideRouter(routes)],
};
