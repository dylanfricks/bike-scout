import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BikeSearchModel, BikeSearchInterface } from '../models/bike-search.model';
import { BikeDetailModel, BikeDetailInterface } from '../models/bike-detail.model';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  bikes = signal<BikeSearchModel[]>([]);
  private apiUrl = environment ? environment.apiUrl : 'https://bikeindex.org/api/v3';

  constructor(private http: HttpClient) {}

  searchBikes(city: string): Observable<BikeSearchModel[]> {
    const url = `${this.apiUrl}/search?location=${city}&distance=10&stolenness=proximity`;
    return this.http.get<{"bikes": BikeSearchInterface[]}>(url)
      .pipe(map((response: {"bikes": BikeSearchInterface[]}) => response?.bikes?.map(bike => new BikeSearchModel(bike))));
  }

  getBikeDetails(id: string): Observable<BikeDetailModel | null> {
    const url = `${this.apiUrl}/bikes/${id}`;
    return this.http.get<{"bike": BikeDetailInterface}>(url)
      .pipe(map((response: {"bike": BikeDetailInterface}) => new BikeDetailModel(response.bike)));
  }
}