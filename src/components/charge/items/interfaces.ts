import { ChargerInterface } from "@/lib/charger";
import { ConnectorInterface } from "@/lib/connector";
import { ItemsInterface, ItemsType } from "@/lib/global";
import { LocationInterface } from "@/lib/location";

export type StepType = 1 | 2 | 3;

export interface ItemsDataInterface {
    title: string;
    itemsCopy: ItemsInterface;
    form: FormInterface;
    workingItems?: ItemsType;
}

export interface FormInterface {
    location?: LocationInterface;
    charger?: ChargerInterface;
    connector?: ConnectorInterface;
}