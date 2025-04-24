export class StolenRecordModel implements StolenRecordInterface {
    constructor(obj?: Partial<StolenRecordInterface>) {
      if (obj) {
        Object.assign(this, obj);

        if (obj.date_stolen) {
          this.dateStolen = new Date(obj.date_stolen * 1000);
        }

        if (obj.created_at) {
          this.createdAt = new Date(obj.created_at * 1000);
        }
      }
    }
  
    create_open311:boolean | null = null;
    created_at: number | null = null;
    date_stolen: number | null = null;
    id: number | null = null;
    latitude: number | null = null;
    location: string | null = null;
    lock_defeat_description: string | null = null;
    locking_description: string | null = null;
    longitude: number | null = null;
    police_report_department: string | null = null;
    police_report_number:number | null = null;
    theft_description: string | null = null;

    
    dateStolen: Date | null = null;
    createdAt: Date | null = null;
}
export interface StolenRecordInterface {
    create_open311: boolean | null;
    created_at: number | null;
    date_stolen: number | null;
    id: number | null;
    latitude: number | null;
    location: string | null;
    lock_defeat_description: string | null;
    locking_description: string | null;
    longitude: number | null;
    police_report_department: string | null;
    police_report_number: number | null;
    theft_description: string | null;
}