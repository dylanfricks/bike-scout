import { Routes } from '@angular/router';
import { BikeSearchComponent } from './bike-search/bike-search.component';
import { BikeDetailComponent } from './bike-detail/bike-detail.component';

export const routes: Routes = [
    { path: '', component: BikeSearchComponent },
    { path: 'bike/:id', component: BikeDetailComponent }
  ];
