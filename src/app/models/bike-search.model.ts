
export class BikeSearchModel implements BikeSearchInterface{
    constructor(obj?: Partial<BikeSearchInterface>) {
        if (obj) {
            Object.assign(this, obj);

            if(obj.date_stolen) {
                this.dateStolen = new Date(obj.date_stolen * 1000);
            }
        }
    }
    date_stolen: number = 0;
    description: string = '';
    frame_colors: string[] | null = null;
    frame_model: string | null = null;
    id: number = 0;
    is_stock_img: boolean = false;
    large_img: string | null = null;
    location_found: string | null = null;
    manufacturer_name: string = '';
    external_id: string | null = null;
    registry_name: string | null = null;
    registry_url: string | null = null;
    serial: string = '';
    status: string = '';
    stolen: boolean = false;
    stolen_coordinates: [number, number] | null = null;
    stolen_location: string = '';
    thumb: string | null = null;
    title: string = '';
    url: string = '';
    year: number | null = null;
    propulsion_type_slug: string = '';
    cycle_type_slug: string = '';

    dateStolen: Date | null = null;
}
export interface BikeSearchInterface {
  date_stolen: number;
  description: string;
  frame_colors: string[] | null;
  frame_model: string | null;
  id: number;
  is_stock_img: boolean;
  large_img: string | null;
  location_found: string | null;
  manufacturer_name: string;
  external_id: string | null;
  registry_name: string | null;
  registry_url: string | null;
  serial: string;
  status: string;
  stolen: boolean;
  stolen_coordinates: [number, number] | null;
  stolen_location: string;
  thumb: string | null;
  title: string;
  url: string;
  year: number | null;
  propulsion_type_slug: string;
  cycle_type_slug: string;
}