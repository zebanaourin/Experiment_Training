import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { EditComponent } from './edit/edit.component';
import { GridComponent } from './grid/grid.component';

export const routes: Routes = [
    { path: '', component: SearchComponent },
    { path: 'edit/:fileNumber', component: EditComponent },
    { path: '**', redirectTo: '' }
];

