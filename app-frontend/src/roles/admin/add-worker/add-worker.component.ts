import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import { AdminService } from '../../../api/services/admin.service';
import { ModelGetSession } from '../../../model/guest.model';

@Component({
  selector: 'gf-add-worker',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-worker.component.html',
})
export class AddWorkerComponent {
  constructor(private adminService:AdminService){
  }

  form_addUser:ModelGetSession = { username:'',password:'' }

  flag_getUserOk:boolean = false;
  flag_getUserReq:boolean = false;

  getUser(){
    this.flag_getUserReq = false;
    this.flag_getUserOk = false;

    this.adminService.getClient(this.form_addUser.username).subscribe({
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

    this.adminService.addClient(this.form_addUser.username,this.form_addUser.password).subscribe({
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
