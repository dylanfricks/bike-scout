export class PublicImageModel implements PublicImageInterface {
    constructor(obj?: Partial<PublicImageInterface>) {
        if (obj) {
            Object.assign(this, obj);
            // put the smallest image in the thumb property
            if (obj.medium && !obj.thumb) {
                this.thumb = obj.medium;
            } else if (obj.large && !obj.thumb) {
                this.thumb = obj.large;
            } else if (obj.full && !obj.thumb) {
                this.thumb = obj.full;
            } else {
                this.thumb = null;
            }
            // put the largest image in the full property
            if (obj.full) {
                this.full = obj.full;
            } else if (obj.large) {
                this.full = obj.large;
            } else if (obj.medium) {
                this.full = obj.medium;
            } else {
                this.full = null;
            }
        }
    }
    id: number = 0;
    full: string | null = null;
    large: string | null = null;
    medium: string | null = null;
    name: string | null = null;
    thumb: string | null = null;

}
export interface PublicImageInterface {
    id: number;
    full: string | null;
    large: string | null;
    medium: string | null;
    name: string | null;
    thumb: string | null;
}