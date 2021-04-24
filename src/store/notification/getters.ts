import { NotificationState } from './interfaces';
import { GetterTree } from "vuex";
import { RootState } from '../interfaces';

export const getters: GetterTree<NotificationState, RootState> = {
    getNotificationState: (state) => {
        return { ...state };
    },
}