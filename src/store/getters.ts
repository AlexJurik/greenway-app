import { RootState } from './interfaces';
import { GetterTree } from "vuex";

export const getters: GetterTree<RootState, RootState> = {
    getIsCharging: (state) => {
        return state.charging;
    },
}