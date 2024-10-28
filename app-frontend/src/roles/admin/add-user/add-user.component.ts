import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import { AdminService } from '../../../api/services/admin.service';
import { ModelGetSession, ModelRole } from '../../../model/guest.model';

@Component({
  selector: 'gf-add-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
})
export class AddUserComponent {
  constructor(private adminService: AdminService) { }
  formAddUser: { username: string, password: string, role: ModelRole } = { username: '', password: '', role: 'worker' };

  flagCheckUserOk: boolean = false;
  flagCheckUserReq: boolean = false;

  setRol(rol: ModelRole) {
    this.formAddUser.role = rol;
  }

  checkUser() {
    this.flagCheckUserReq = false;
    this.flagCheckUserOk = false;
    if (!this.formAddUser) { return };

    this.adminService.checkUser({ username: this.formAddUser.username }).subscribe({
      next: (value: any) => {
        this.flagCheckUserOk = true;
        this.flagCheckUserReq = true;
      },
      complete: () => {
      },
      error: (error) => {
        this.flagCheckUserOk = false;
        this.flagCheckUserReq = true;
      }
    });
  }

  flagAddUserReq: boolean = false;
  flagAddUserOk: boolean = false;

  addUser() {
    this.flagAddUserReq = false;
    this.flagAddUserOk = false;
    if (!this.formAddUser) { return };

    this.adminService.addUser(this.formAddUser).subscribe({
      next: (value: any) => {
        this.flagAddUserOk = true;
        this.flagAddUserReq = true;
      },
      complete: () => {
      },
      error: (error) => {
        this.flagAddUserOk = false;
        this.flagAddUserReq = true;
      }
    });
  }

}
