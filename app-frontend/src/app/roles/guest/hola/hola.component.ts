import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CarouselComponent } from "../carousel/carousel.component";
import { AddClientComponent } from '../add-client/add-client.component';
import { AddSessionComponent } from '../add-session/add-session.component';

@Component({
  selector: 'gf-hola',
  standalone: true,
  imports: [NavbarComponent, CarouselComponent, AddClientComponent, AddSessionComponent],
  templateUrl: './hola.component.html',
})
export class HolaComponent {
  flag_view:string = 'hi';

  constructor() {
  }

}
