import { Notification } from 'electron';
import { config } from '../../config.js';

export const showNotification = (title, body) => {
  const notification = new Notification({ title, body });
  notification.show();
};

export const paymentReminder = () => {
  showNotification(
    config.notifications.paymentReminderTitle,
    config.notifications.paymentReminderBody
  );
};
