import { FormInterface } from './../items/interfaces';
import { ItemsInterface } from './../../../lib/global';

export interface DialogDataInterface {
    data: ItemsInterface;
    filtered: boolean;
    dialog: boolean;
    step: number;
    stepComponent: StepComponentEnum;
    form: FormInterface;
    subtitle: string;
    disableOpenButton: boolean;
}

export enum StepComponentEnum {
    'Location' = 'Location',
    'Charger' = 'Charger',
    'Connector' = 'Connector',
    'Confirm' = 'Confirm',
}