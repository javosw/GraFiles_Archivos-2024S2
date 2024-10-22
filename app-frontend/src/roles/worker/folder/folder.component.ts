import { Component, Input } from '@angular/core';
//
import { WorkerService } from '../../../api/services/worker.service';
import { ModelFolder } from '../../../model/worker.model';

@Component({
  selector: 'gf-folder',
  standalone: true,
  imports: [],
  templateUrl: './folder.component.html',
  styles: `.folder { width: 500px; }`
})
export class FolderComponent {
  constructor(private workerService: WorkerService) { }

  ngOnInit() { this.getFolder(); }

  @Input() _id: string = '';
  dataFolder: ModelFolder | null = null;

  flagShowContent: boolean = false;
  flagShowOperations: boolean = false;

  addFolder() { }
  addFile() { }

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
