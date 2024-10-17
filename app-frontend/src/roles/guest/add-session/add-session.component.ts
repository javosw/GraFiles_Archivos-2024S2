import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GuestService } from '../../../api/services/guest.service';
import { DataAddSession } from '../../../data/guest.data';

@Component({
  selector: 'gf-add-session',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-session.component.html',
})
export class AddSessionComponent {
  constructor(private guestService:GuestService, private router:Router){
    this.guestService.flag_hasSession.subscribe((val)=>{this.flag_addSessionOk = val;});
  }

  form_addUser:DataAddSession = { username:'',password:'' }

  flag_addSessionReq: boolean = false;
  flag_addSessionOk: boolean = false;

  addSession(){

    this.flag_addSessionReq = false;
    //this.flag_addSessionOk esta manejada por GuestService
    this.guestService.addSession(this.form_addUser);
    this.flag_addSessionReq = true;

  }

}
