import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import { WorkerService } from '../../../api/services/worker.service';
import { ModelFolder } from '../../../model/worker.model';
import { FileComponent } from '../file/file.component';

@Component({
  selector: 'gf-folder',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, FileComponent],
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
  dataAddFolder: { name: string } = { name: '' };

  addFolder() {
    this.workerService.addFolder({ ancestor: this._id, name: this.dataAddFolder.name }).subscribe({
      next: (value: { _id: string }) => {
        this.dataFolder?.folders.push(value._id);
        this.flagShowContent = true;
      },
      error: () => { }
    })
  }

  getFolder() {
    this.workerService.getFolder({ _id: this._id }).subscribe({
      next: (value: ModelFolder) => {
        this.dataFolder = value;
      },
      error: () => {
      }
    });
  }

  file: File | null = null;

  setFile(event: Event) {
    if (event) {
      let element = event.target as HTMLInputElement;
      let fileList: FileList | null = element.files;
      if (fileList) {
        console.log(fileList);
        this.file = fileList[0];
      }
    }
  }

  addFile() {
    if (!this.file) { return; }
    this.workerService.addFile(this._id, this.file).subscribe({
      next: (value: { _id: string }) => {
        this.dataFolder?.files.push(value._id);
        this.flagShowContent = true;
      },
      error: () => { }
    });
  }

  flagShowContent: boolean = false;
  flagShowOperations: boolean = false;
  flagAddFolder: boolean = false;
  flagAddImage: boolean = false;
  flagAddText: boolean = false;
  flagDelete: boolean = false;
  flagAddFile: boolean = false;

  actions(button: 'add-file' | 'show-content' | 'add-folder' | 'copy' | 'move' | 'delete') {
    if (button == 'show-content') {
      this.flagShowContent = !this.flagShowContent
    }
    else if (button == 'add-folder') {
      this.flagAddFolder = !this.flagAddFolder
    }
    else if (button == 'add-file') {
      this.flagAddFile = !this.flagAddFile
    }
    else if (button == 'copy') {
    }
    else if (button == 'move') { }
    else if (button == 'delete') {
      this.flagDelete = !this.flagDelete;
    }
  }

}
