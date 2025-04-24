import { StolenRecordModel, StolenRecordInterface } from './stolen-record.model';
import { PublicImageModel, PublicImageInterface } from './public-image.model';

export class BikeDetailModel implements BikeDetailInterface {
  constructor(obj?: Partial<BikeDetailInterface>) {
    if (obj) {
      Object.assign(this, obj);

      if (obj.stolen_record) {
        this.stolenRecord = new StolenRecordModel(obj.stolen_record);
      }

      if (obj.date_stolen) {
        this.dateStolen = new Date(obj.date_stolen * 1000);
      }

      if (obj.registration_created_at) {
        this.registrationCreatedAt = new Date(obj.registration_created_at * 1000);
      }

      if (obj.registration_updated_at) {
        this.registrationUpdatedAt = new Date(obj.registration_updated_at * 1000);
      }

      if (obj.public_images && obj.public_images.length > 0) {
        this.public_images = obj.public_images.map((img: PublicImageInterface) => new PublicImageModel(img));
      }
    }
  }

  additional_registration: string | null = null;
  api_url: string = '';
  components: any[] = [];
  cycle_type_slug: string = '';
  date_stolen: number | null = null;
  dateStolen: Date | null = null;
  description: string | null = null;
  external_id: string | null = null;
  frame_colors: string[] = [];
  frame_material_slug: string | null = null;
  frame_model: string | null = null;
  frame_size: string | null = null;
  front_gear_type_slug: string | null = null;
  front_tire_narrow: boolean | null = null;
  front_wheel_size_iso_bsd: string | null = null;
  handlebar_type_slug: string | null = null;
  id: number = 0;
  is_stock_img: boolean = false;
  large_img: string | null = null;
  location_found: string | null = null;
  manufacturer_id: number | null = null;
  manufacturer_name: string = '';
  name: string | null = null;
  paint_description: string | null = null;
  propulsion_type_slug: string = '';
  public_images: any[] = [];
  rear_gear_type_slug: string | null = null;
  rear_tire_narrow: boolean | null = null;
  rear_wheel_size_iso_bsd: string | null = null;
  registration_created_at: number | null = null;
  registrationCreatedAt: Date | null = null;
  registration_updated_at: number | null = null;
  registrationUpdatedAt: Date | null = null;
  registry_name: string | null = null;
  registry_url: string | null = null;
  serial: string = '';
  status: string = '';
  stolen: boolean = false;
  stolen_coordinates: [number, number] | null = [0, 0];
  stolen_location: string | null = null;
  stolen_record: StolenRecordInterface | null = null;
  stolenRecord: StolenRecordModel | null = null;
  test_bike: boolean = false;
  thumb: string | null = null;
  title: string = '';
  type_of_cycle: string = '';
  url: string | null = null;
  year: number | null = null;
}

export interface BikeDetailInterface {
  additional_registration: string | null;
  api_url: string;
  components: any[];
  cycle_type_slug: string;
  date_stolen: number | null;
  description: string | null;
  external_id: string | null;
  frame_colors: string[];
  frame_material_slug: string | null;
  frame_model: string | null;
  frame_size: string | null;
  front_gear_type_slug: string | null;
  front_tire_narrow: boolean | null;
  front_wheel_size_iso_bsd: string | null;
  handlebar_type_slug: string | null;
  id: number;
  is_stock_img: boolean;
  large_img: string | null;
  location_found: string | null;
  manufacturer_id: number | null;
  manufacturer_name: string;
  name: string | null;
  paint_description: string | null;
  propulsion_type_slug: string;
  public_images: any[];
  rear_gear_type_slug: string | null;
  rear_tire_narrow: boolean | null;
  rear_wheel_size_iso_bsd: string | null;
  registration_created_at: number | null;
  registration_updated_at: number | null;
  registry_name: string | null;
  registry_url: string | null;
  serial: string;
  status: string;
  stolen: boolean;
  stolen_coordinates: [number, number] | null;
  stolen_location: string | null;
  stolen_record: StolenRecordInterface | null;
  test_bike: boolean;
  thumb: string | null;
  title: string;
  type_of_cycle: string;
  url: string | null;
  year: number | null;
}