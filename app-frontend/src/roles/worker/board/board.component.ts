import { Component } from '@angular/core';
//
import { FolderComponent } from "../folder/folder.component";
import { WorkerService } from '../../../api/services/worker.service';
import { ModelGetSessionOk } from '../../../model/guest.model';
import { GuestService } from '../../../api/services/guest.service';

@Component({
  selector: 'gf-board',
  standalone: true,
  imports: [FolderComponent],
  templateUrl: './board.component.html',
})
export class BoardComponent {
  constructor(private workerService: WorkerService, private guestService: GuestService) {
    guestService.dataGetSessionOk.subscribe((value) => { this.dataGetSessionOk = value; });
  }
  dataGetSessionOk: ModelGetSessionOk | null = null;
}
