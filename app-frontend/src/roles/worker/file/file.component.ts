import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import { WorkerService } from '../../../api/services/worker.service';
import { ModelFile } from '../../../model/worker.model';
import { apiWorkerOpenFile } from '../../../api/routes/gf-api.paths';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GuestService } from '../../../api/services/guest.service';

@Component({
  selector: 'gf-file',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './file.component.html',
  styles: `.file { width: 500px; }`
})
export class FileComponent {
  constructor(private workerService: WorkerService, private guestService: GuestService, private domSanitizer: DomSanitizer) {
    guestService.dataGetSessionOk.subscribe((value) => { this.formOwner = value?.username || '' })
  }
  ngOnInit() { this.getFile(); }
  formOwner: string = '';

  @Input() _id: string = '';
  modelFile: ModelFile | null = null;

  apiOpenFile: SafeResourceUrl | null = null;

  getFile() {
    this.workerService.getFile({ _id: this._id }).subscribe({
      next: (value: ModelFile) => {
        this.modelFile = value;
        if (value.mimetype == 'image/png' || value.mimetype == 'image/jpeg') {
          this.flagIcon = 'image';
        }
        else if (value.mimetype == 'text/plain' || value.mimetype == 'text/html') {
          this.flagIcon = 'text';
        }

        this.apiOpenFile = this.domSanitizer.bypassSecurityTrustResourceUrl(apiWorkerOpenFile(value.ancestor, value.originalname));
      },
      error: () => {
      }
    });
  }

  formAllowedUser: string = '';


  flagShareSent: boolean = false;
  flagShareOk: boolean = false;

  shareFile() {
    this.flagShareSent = false;
    this.flagShareOk = false;
    if (!this.modelFile?._id || this.formOwner.length == 0 || this.formAllowedUser.length == 0) { return; }
    this.workerService.shareFile({
      idFile: this.modelFile._id,
      fromUser: this.formOwner,
      toUser: this.formAllowedUser
    }).subscribe({
      next:(value)=>{
        this.flagShareSent = true;
        this.flagShareOk = true;
      },
      error:()=>{
        this.flagShareSent = true;
        this.flagShareOk = false;
      }
    })
  }

  flagIcon: 'image' | 'text' | null = null;
  flagShowContent: boolean = false;
  flagShowOperations: boolean = false;
  flagDelete: boolean = false;
  flagShare: boolean = false;
  flagCopy: boolean = false;
  flagMove: boolean = false;

  actions(button: 'show-content' | 'share' | 'copy' | 'move' | 'delete') {
    if (button == 'show-content') {
      this.flagShowContent = !this.flagShowContent
    }
    else if (button == 'share') {
      this.flagShare = !this.flagShare
    }
    else if (button == 'copy') {
      this.flagCopy = !this.flagCopy
    }
    else if (button == 'move') {
      this.flagMove = !this.flagMove
    }
    else if (button == 'delete') {
      this.flagDelete = !this.flagDelete;
    }
  }

}
