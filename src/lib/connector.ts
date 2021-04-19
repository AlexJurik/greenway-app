import { ItemType } from './global';
export interface ConnectorInterface {
    id: string;
    createdAt: Date;
    name: string;
}

export type ConnectorType = ItemType<ConnectorInterface>;
