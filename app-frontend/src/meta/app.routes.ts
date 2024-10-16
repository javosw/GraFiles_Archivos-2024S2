import { Routes } from '@angular/router';
import { BoardComponent as WorkerBoard } from '../roles/worker/board/board.component';
import { BoardComponent as AdminBoard } from '../roles/admin/board/board.component';
import { rolGuard } from '../api/guards/rol.guard';

export const routes: Routes = [
    { 
        path: 'worker', 
        component: WorkerBoard,
        canActivate:[rolGuard],
        canActivateChild:[rolGuard],
        children:[
            //{ path:'root', component: UserGetEvents },
        ]
    },
    { 
        path: 'admin', 
        component: AdminBoard,
        canActivate:[rolGuard],
        canActivateChild:[rolGuard],
    },
];
