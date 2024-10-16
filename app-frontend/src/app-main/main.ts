import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '../app-meta/app.config';
import { HiComponent } from '../roles/guest/hi/hi.component';

bootstrapApplication(HiComponent, appConfig)
  .catch((err) => console.error(err));
