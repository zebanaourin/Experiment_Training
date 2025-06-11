import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { EditComponent } from './edit/edit.component';
import { GridComponent } from './edit-grid/grid.component';
import { ModifyComponent } from './modify/modify.component';


export const routes: Routes = [
    { path: '', component: SearchComponent },
    { path: 'edit/:fileNumber', component: EditComponent },
    {
        path: 'modify',
        component: ModifyComponent
    },
    {
        path: 'modify/:fileNumber',
        component: ModifyComponent
    },
    { path: '**', redirectTo: '' } // ✅ Moved to bottom
];


