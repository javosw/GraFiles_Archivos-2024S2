import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import { AdminService } from '../../../api/services/admin.service';
import { ModelTrashFolder } from '../../../model/admin.model';
import { TrashFileComponent } from '../trash-file/trash-file.component';

@Component({
  selector: 'gf-trash-folder',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TrashFileComponent],
  templateUrl: './trash-folder.component.html',
  styles: `
  .folder { width: 500px; }
  ul { list-style-type: none; }
  `
})
export class TrashFolderComponent {
  constructor(private adminService: AdminService) { }

  ngOnInit() { this.getFolder(); }

  dataFolder: ModelTrashFolder | null = null;

  getFolder() {
    this.adminService.getTrashFolder().subscribe({
      next: (value: ModelTrashFolder) => {
        this.dataFolder = value;
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
