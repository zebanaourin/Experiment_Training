import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { EditComponent } from './edit/edit.component';


export const routes: Routes = [
    { path: '', component: SearchComponent },
    { path: 'edit/:fileNumber', component: EditComponent },
    { path: '**', redirectTo: '' }

    
    
];

