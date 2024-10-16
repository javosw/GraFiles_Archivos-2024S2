import { bootstrapApplication } from '@angular/platform-browser';
import { HiComponent } from '../roles/guest/hi/hi.component';
import { appConfig } from '../meta/app.config';

bootstrapApplication(HiComponent, appConfig)
  .catch((err) => console.error(err));
