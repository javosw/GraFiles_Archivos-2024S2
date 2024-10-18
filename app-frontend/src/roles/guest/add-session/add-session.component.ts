import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { GuestService } from '../../../api/services/guest.service';
import { DataGetSession } from '../../../data/guest.data';

@Component({
  selector: 'gf-add-session',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './add-session.component.html',
})
export class AddSessionComponent {

  constructor(private guestService: GuestService) {
    this.guestService.hasSession.subscribe({
      next: (value: boolean) => {
        this.flagGetSessionOk = value;
        this.flagGetSessionReq = true;
      },
      error: (err: any) => {
        this.flagGetSessionReq = true;
      }
    });
    this.flagGetSessionReq = false;
  }

  formGetSession: DataGetSession = { username: '', password: '' }

  flagGetSessionReq: boolean = false;
  flagGetSessionOk: boolean = false;

  getSession() {
    this.flagGetSessionReq = false;
    this.guestService.getSession(this.formGetSession);
  }

}
