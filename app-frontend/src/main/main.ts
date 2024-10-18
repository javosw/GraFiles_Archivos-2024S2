import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '../meta/app.config';
import { MainComponent } from './main/main.component';

bootstrapApplication(MainComponent, appConfig)
  .catch((err) => console.error(err));
