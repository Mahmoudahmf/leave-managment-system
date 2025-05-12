import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockDataService } from './core/service/mock-data/mock-data.service';

export const appConfig: ApplicationConfig = {
providers: [
  provideRouter(routes),
  provideAnimationsAsync(),
  provideHttpClient(),
  importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(MockDataService, { delay: 300 }))
]};
