import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BikeDetailComponent } from './bike-detail.component';
import { BikeService } from '../services/bike.service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('BikeDetailComponent', () => {
  let component: BikeDetailComponent;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikeDetailComponent],
      providers: [ provideRouter([]), BikeService, 
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    }).compileComponents();
    // component = TestBed.inject(BikeDetailComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(BikeDetailComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
