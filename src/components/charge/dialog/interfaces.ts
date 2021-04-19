import { ItemsInterface } from './../../../lib/global';

export interface DialogDataInterface {
    data: ItemsInterface;
    dialog: boolean;
    step: number;
    stepComponent: StepComponentEnum;

}

export enum StepComponentEnum {
    'Location' = 'Location',
    'Charger' = 'Charger',
    'Connector' = 'Connector',
    'Confirm' = 'Confirm',
}