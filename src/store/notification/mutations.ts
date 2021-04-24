import { NotificationState } from './interfaces';
import { MutationTree } from "vuex";

export enum NotificationMutations {
    SET_NOTIFICATION = '[NOTIFICATION] SET_NOTIFICATION',
}

export const mutations: MutationTree<NotificationState> = {
    [NotificationMutations.SET_NOTIFICATION](state: NotificationState, payload: NotificationState) {
        if (payload.message) {
            state.message = payload.message;
        }

        if (payload.type) {
            state.type = payload.type;
        }

        if (payload.timeout) {
            state.timeout = payload.timeout;
        }
    },
}