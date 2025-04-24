import { Routes } from '@angular/router';
import { BikeSearchComponent } from './bike-search/bike-search.component';
import { BikeDetailComponent } from './bike-detail/bike-detail.component';

export const routes: Routes = [
    { path: 'search', component: BikeSearchComponent },
    { path: 'bike/:id', component: BikeDetailComponent },
    { path: '**', redirectTo: 'search' } // Redirect any unknown paths to the home page
  ];
