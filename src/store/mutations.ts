import { RootState } from './interfaces';
import { MutationTree } from "vuex";

export enum RootMutations {
    SET_CHARGING = '[ROOT] SET_CHARGING',
}

export const mutations: MutationTree<RootState> = {
    [RootMutations.SET_CHARGING](state: RootState, payload: boolean) {
        state.charging = payload;
    },
}