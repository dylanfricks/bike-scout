import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BikeSearchComponent } from './bike-search.component';
import { BikeService } from '../services/bike.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BikeSearchComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikeSearchComponent],
      providers: [ provideRouter([]), BikeService, 
        provideHttpClient(),
        provideHttpClientTesting(),
        BreakpointObserver
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(BikeSearchComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
