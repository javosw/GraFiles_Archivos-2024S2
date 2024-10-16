import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GuestService } from '../../../api/services/guest.service';
import { DataAddSession, DataSession } from '../../../data/guest.data';
import { pathAdminBoard, pathClientBoard } from '../../../meta/app.paths';

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



  flag_addSessionOk: boolean = false;
  flag_addSessionReq: boolean = false;


  addSession(){
    this.flag_addSessionReq = false;
    //this.flag_addSessionOk esta manejada por 

    this.guestService.addSession(this.form_addUser.username,this.form_addUser.password).subscribe({
      next: (value: DataSession) => {
        this.flag_addSessionReq = true;

        this.guestService.dataSession = value;
        this.guestService.flag_hasSession.next(true);

        if (value.rol == 'client') {
          this.router.navigate([pathClientBoard]);
        }
        else if (value.rol == 'admin') {
          this.router.navigate([pathAdminBoard]);
        }
      },
      complete: () => {
      },
      error: (error) => {
        this.flag_addSessionReq = true;
        this.guestService.flag_hasSession.next(false);
      }
    });
  }

  // Replacing a form control value
  // this.formControl1.setValue('my value');
  // entrarForm = new FormGroup({ user: new FormControl(''), password: new FormControl('') });

}
