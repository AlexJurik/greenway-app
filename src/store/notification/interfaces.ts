export interface NotificationState {
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
    timeout: number;
}