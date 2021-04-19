import { ItemType } from './global';
export interface LocationInterface {
    id: string;
    createdAt: Date;
    name: string;
}

export type LocationType = ItemType<LocationInterface>;
