import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '../app-meta/app.config';
import { HolaComponent } from '../app/roles/guest/hola/hola.component';

bootstrapApplication(HolaComponent, appConfig)
  .catch((err) => console.error(err));
