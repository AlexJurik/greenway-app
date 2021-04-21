import { ChargerType } from './charger';
import { ConnectorType } from './connector';
import { LocationType } from './location';

export type ItemType<T> = {
    [K in keyof T]: T[K];
}

export interface ItemsInterface {
    saved_locations: LocationType[];
    locations: LocationType[];
    chargers: ChargerType[];
    connectors: ConnectorType[];
}

export type ItemsType = LocationType[] | ConnectorType[] | ChargerType[];