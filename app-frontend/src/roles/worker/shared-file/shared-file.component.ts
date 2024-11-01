import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import { WorkerService } from '../../../api/services/worker.service';
import { ModelFile } from '../../../model/worker.model';
import { apiWorkerOpenFile } from '../../../api/routes/gf-api.paths';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GuestService } from '../../../api/services/guest.service';

@Component({
  selector: 'gf-shared-file',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './shared-file.component.html',
  styles: `.file { width: 500px; }`
})
export class SharedFileComponent {
  constructor(private workerService: WorkerService, private domSanitizer: DomSanitizer) { }
  ngOnInit() { this.getFile(); }

  @Input() _id: string | null = null;
  @Input() fromUser: string | null = null;
  modelFile: ModelFile | null = null;

  apiOpenFile: SafeResourceUrl | null = null;

  getFile() {
    if (!this._id) { return; }
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


  flagIcon: 'image' | 'text' | null = null;
  flagShowContent: boolean = false;
  flagShowOperations: boolean = false;

  actions(button: 'show-content' | 'share' | 'copy' | 'move' | 'delete') {
    if (button == 'show-content') {
      this.flagShowContent = !this.flagShowContent
    }
  }


}
