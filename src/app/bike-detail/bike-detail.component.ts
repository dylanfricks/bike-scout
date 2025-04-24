import { Component, OnInit, signal, effect } from '@angular/core';
import { DatePipe } from '@angular/common'; 
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BikeService } from '../services/bike.service';
import { BikeDetailModel } from '../models/bike-detail.model';
import { PublicImageModel } from '../models/public-image.model';

@Component({
  selector: 'app-bike-detail',
  templateUrl: './bike-detail.component.html',
  styleUrls: ['./bike-detail.component.scss'],
  imports: [DatePipe, MatButtonModule, MatCardModule, MatIconModule, RouterModule],
  standalone: true,
})
export class BikeDetailComponent implements OnInit {
  bikeId: string | null = null;
  bikeDetails = signal<BikeDetailModel | null>(null);
  selectedImageUrl = signal<string | null>(null);
  loading = signal<boolean>(true);

  constructor(private route: ActivatedRoute, private bikeService: BikeService) {
    effect(() => {
      if (this.bikeDetails()) {
        this.loading.set(false);
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bikeId = params.get('id');
      if (this.bikeId) {
        this.fetchBikeDetails(this.bikeId);
      }
    });
  }

  fetchBikeDetails(id: string): void {
    this.bikeService.getBikeDetails(id).subscribe(data => {
      this.bikeDetails.set(data);
      this.selectedImageUrl.set(data?.large_img || null);
    });
  }

  onImageClick(imageUrl: PublicImageModel | null): void {
    if (!imageUrl) {
      this.selectedImageUrl.set(this.bikeDetails()?.large_img || null);
      return;
    }
    this.selectedImageUrl.set(imageUrl.full);
  }

  onImageError(image: PublicImageModel): void {
    // remove this image from the public_images array
    this.bikeDetails()?.public_images.filter((img: PublicImageModel) => {
      return img.id !== image.id;
    });
  }
}