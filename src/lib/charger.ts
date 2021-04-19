import { ItemType } from './global';
export interface ChargerInterface {
    id: string;
    createdAt: Date;
    name: string;
}

export type ChargerType = ItemType<ChargerInterface>;
