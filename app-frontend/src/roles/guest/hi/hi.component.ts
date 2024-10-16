import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { AddClientComponent } from '../add-client/add-client.component';
import { AddSessionComponent } from '../add-session/add-session.component';

@Component({
  selector: 'gf-hi',
  standalone: true,
  imports: [NavbarComponent, CarouselComponent, AddClientComponent, AddSessionComponent],
  templateUrl: './hi.component.html',
})
export class HiComponent {
  flag_view:string = 'hi';

  constructor() {
  }
}
