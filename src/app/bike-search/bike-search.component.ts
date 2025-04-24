import { Component, signal, effect, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { debounceTime, finalize } from 'rxjs';
import { BikeSearchModel } from '../models/bike-search.model';
import { BikeService } from '../services/bike.service';

@Component({
  selector: 'app-bike-search',
  standalone: true,
  templateUrl: './bike-search.component.html',
  styleUrls: ['./bike-search.component.scss'],
  imports: [DatePipe, FormsModule, MatInputModule, MatButtonModule, 
    MatCardModule, MatProgressSpinnerModule, MatIconModule, MatGridListModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatSlideToggleModule, RouterModule ],
})
export class BikeSearchComponent implements OnInit, AfterViewInit {
  searchQuery = signal<string>('');
  includeAll = signal<boolean>(false);
  // bikes = signal<BikeSearchModel[]>([]);
  loading = signal<boolean>(false);
  errorMessage = signal<string>('');

  displayedColumns: string[] = ['thumb', 'title', 'frame_model', 'cycle_type','dateLocationStolen', 'serial', 'status'];
  dataSource: MatTableDataSource<BikeSearchModel> = new MatTableDataSource<BikeSearchModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isSmallDevice: boolean = false;
  constructor(public bikeService: BikeService, private breakpointObserver: BreakpointObserver) {
    effect(() => {
      if (this.searchQuery().length > 2) {
        this.fetchBikes(this.searchQuery());
      }
    });

    effect(() => {
      this._updateDataColumns();
    });
  }

  ngOnInit(): void {
    // Initialize the data source with an empty array
    this.dataSource = new MatTableDataSource<BikeSearchModel>();
    this.dataSource.data = this.bikeService.bikes();
    // Set up responsive design for the table
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {
        this.isSmallDevice = result.matches;
        this._updateDataColumns();
      });
  }

  ngAfterViewInit(): void {
    // Assign paginator and sort to the data source
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchBikes(query: string) {
    this.loading.set(true);
    this.errorMessage.set('');
    this.bikeService.searchBikes(query)
    .pipe(
      debounceTime(1000),
      finalize(() => this.loading.set(false)))
    .subscribe({
      next: (data: BikeSearchModel[]) => {
        this.bikeService.bikes.set(data);
        this.filterDataSource(data);
      },
      error: (error) => {
        this.errorMessage.set('Error fetching bikes. Please try again.');
      }
    });
  }

  onSearchChange(query: string) {
    this.searchQuery.set(query);
  }

  filterDataSource(data: BikeSearchModel[] = this.bikeService.bikes()): void {
    this.dataSource = new MatTableDataSource<BikeSearchModel>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.includeAll()) {
      // If includeAll is true, return all bikes regardless of status
      this.dataSource.data = data;
      return;
    }
    // filter out any bikes with status == found 
    this.dataSource.data = data.filter(bike => bike.status !== 'found' || bike.stolen);
  }
  
  private _updateDataColumns(): void {
    if (this.isSmallDevice && !this.includeAll()) {
      this.displayedColumns = ['thumb', 'title', 'frame_model', 'dateLocationStolen'];
    } else if(this.isSmallDevice && this.includeAll()) {
      this.displayedColumns = ['thumb', 'title', 'frame_model', 'dateLocationStolen', 'status'];
    } else if (!this.includeAll()) {
      this.displayedColumns = ['thumb', 'title', 'frame_model', 'cycle_type', 'dateLocationStolen', 'serial'];
    } else {
      this.displayedColumns = ['thumb', 'title', 'frame_model', 'cycle_type', 'dateLocationStolen', 'serial', 'status'];
    }
  }
}