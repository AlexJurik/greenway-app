
import { NotificationMutations } from './mutations';
import { NotificationState } from './interfaces';
import { ActionTree } from 'vuex';
import { RootState } from '../interfaces';

export enum NotificationActions {
    SET_NOTIFICATION = 'setNotification'
}

export const actions: ActionTree<NotificationState, RootState> = {
    async [NotificationActions.SET_NOTIFICATION](context, payload: NotificationState) {
        context.commit(NotificationMutations.SET_NOTIFICATION, payload);
    }
}