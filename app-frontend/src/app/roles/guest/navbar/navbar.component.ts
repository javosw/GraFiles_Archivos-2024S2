import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'gf-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Output() input_view = new EventEmitter<string>;

  emitView(decicion:string){
    this.input_view.emit(decicion);
  }

}
