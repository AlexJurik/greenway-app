
import { RootMutations } from './mutations';
import { RootState } from './interfaces';
import { ActionTree } from 'vuex';

export enum RootActions {
    SET_CHARGING = 'setCharging'
}

export const actions: ActionTree<RootState, RootState> = {
    async [RootActions.SET_CHARGING](context, payload: boolean) {
        context.commit(RootMutations.SET_CHARGING, payload);
    }
}