import { Component } from '@angular/core';
import { GuestService } from '../../../api/services/guest.service';
import { Role } from '../../../data/guest.data';

@Component({
  selector: 'gf-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
})
export class BoardComponent {
  constructor(private guestService: GuestService) { }

  testSession(role: Role | null) {
    this.guestService.testSession(role);
  }
}
