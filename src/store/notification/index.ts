import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';
import { NotificationState } from './interfaces'
import { RootState } from '../interfaces';
import { Module } from 'vuex';

const state: NotificationState = {
  message: '',
  type: 'success',
  timeout: 3000
}

const notification: Module<NotificationState, RootState> = {
  state,
  getters,
  mutations,
  actions,
}

export default notification;