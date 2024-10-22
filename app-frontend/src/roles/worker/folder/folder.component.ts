import { Component, Input } from '@angular/core';
//
import { WorkerService } from '../../../api/services/worker.service';
import { ModelFolder } from '../../../model/worker.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'gf-folder',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './folder.component.html',
  styles: `
  .folder { width: 500px; }
  ul { list-style-type: none; }
  `
})
export class FolderComponent {
  constructor(private workerService: WorkerService) { }

  ngOnInit() { this.getFolder(); }

  @Input() _id: string = '';
  dataFolder: ModelFolder | null = null;

  flagShowContent: boolean = false;
  flagShowOperations: boolean = false;

  dataAddFolder: { name: string } = { name: '' };

  addFolder() {
    this.workerService.addFolder({ ancestor: this._id, name: this.dataAddFolder.name }).subscribe({
      next: (value: { _id: string }) => {
        this.dataFolder?.folders.push(value._id);
      },
      error: () => { }
    })
  }
  addFile() { }

  flagAddFolder: boolean = false;

  /*
ObjectId(inputId: string): ObjectId
Create ObjectId from a 24 character hex string.

(method) ObjectId.toString(encoding?: "hex" | "base64"): string
Converts the id into a 24 character hex string for printing, unless encoding is provided.
  */

  getFolder() {
    this.workerService.getFolder({ _id: this._id }).subscribe({
      next: (value: ModelFolder) => {
        this.dataFolder = value;
      },
      error: () => {
      }
    });
  }
}
