import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataAddSession } from '../../../../app-data/guest.data'; 
import { GuestService } from '../../../../app-api/services/guest.service';

@Component({
  selector: 'gf-add-client',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-client.component.html',
})
export class AddClientComponent {
  constructor(private guestService:GuestService){
  }

  form_addUser:DataAddSession = { username:'',password:'' }

  flag_getUserOk:boolean = false;
  flag_getUserReq:boolean = false;

  getUser(){
    this.flag_getUserReq = false;
    this.flag_getUserOk = false;

    this.guestService.getClient(this.form_addUser.username).subscribe({
      next: (value: any) => {
        this.flag_getUserOk = true;
        this.flag_getUserReq = true;
      },
      complete: () => {
      },
      error: (error) => {
        this.flag_getUserOk = false;
        this.flag_getUserReq = true;
      }
    });
  }

  flag_addUserReq:boolean = false;
  flag_addUserOk:boolean = false;

  addUser(){
    this.flag_addUserReq = false;
    this.flag_addUserOk = false;

    this.guestService.addClient(this.form_addUser.username,this.form_addUser.password).subscribe({
      next: (value: any) => {
        this.flag_addUserOk = true;
        this.flag_addUserReq = true;
      },
      complete: () => {
      },
      error: (error) => {
        this.flag_addUserOk = false;
        this.flag_addUserReq = true;
      }
    });
  }

}
