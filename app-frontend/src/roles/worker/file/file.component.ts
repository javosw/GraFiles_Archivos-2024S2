import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import { WorkerService } from '../../../api/services/worker.service';
import { ModelFile } from '../../../model/worker.model';
import { apiWorkerOpenFile } from '../../../api/routes/gf-api.paths';

@Component({
  selector: 'gf-file',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './file.component.html',
  styles: `.file { width: 500px; }`
})
export class FileComponent {
  constructor(private workerService: WorkerService) { }
  ngOnInit() { this.getFile(); }

  @Input() _id: string = '';
  modelFile: ModelFile | null = null;

  src: string = '';
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
        this.src = apiWorkerOpenFile(value.ancestor, value.originalname);
      },
      error: () => {
      }
    });
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
