import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import { WorkerService } from '../../../api/services/worker.service';
import { ModelSharedFolder } from '../../../model/worker.model';
import { SharedFileComponent } from '../shared-file/shared-file.component';

@Component({
  selector: 'gf-shared-folder',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SharedFileComponent],
  templateUrl: './shared-folder.component.html',
  styles: `
  .folder { width: 500px; }
  ul { list-style-type: none; }
  `
})
export class SharedFolderComponent {
  constructor(private workerService: WorkerService) { }

  ngOnInit() { this.getFolder(); }

  @Input() _id: string | null = null;
  dataFolder: ModelSharedFolder | null = null;

  getFolder() {
    if (!this._id) { return; }
    this.workerService.getSharedFolder({ _id: this._id }).subscribe({
      next: (value: ModelSharedFolder) => {
        this.dataFolder = value;
      },
      error: () => {
      }
    });
  }

  flagShowContent: boolean = false;

  actions(button: 'show-content') {
    if (button == 'show-content') {
      this.flagShowContent = !this.flagShowContent
    }
  }

}
