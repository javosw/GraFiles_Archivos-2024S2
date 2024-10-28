import { Component } from '@angular/core';
import { WorkerService } from '../../../api/services/worker.service';
import { GuestService } from '../../../api/services/guest.service';
import { ModelGetSessionOk } from '../../../model/guest.model';
import { FolderComponent } from '../../worker/folder/folder.component';
import { SharedFolderComponent } from '../../worker/shared-folder/shared-folder.component';
import { TrashFolderComponent } from '../trash-folder/trash-folder.component';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'gf-board',
  standalone: true,
  imports: [FolderComponent, SharedFolderComponent, TrashFolderComponent, AddUserComponent],
  templateUrl: './board.component.html',
})
export class BoardComponent {
  constructor(private workerService: WorkerService, private guestService: GuestService) {
    guestService.dataGetSessionOk.subscribe((value) => { this.dataGetSessionOk = value; });
  }
  dataGetSessionOk: ModelGetSessionOk | null = null;

  currentView: 'folders' | 'add-user' = 'folders';

  setCurrentView(view: 'folders' | 'add-user') {
    this.currentView = view;
  }

}
