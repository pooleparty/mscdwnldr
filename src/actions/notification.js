export const ACKNOWLEDGE_NOTIFICATION = 'ACKNOWLEDGE_NOTIFICATION';

export function acknowledgeNotification(id) {
  return {
    type: ACKNOWLEDGE_NOTIFICATION,
    id
  };
}
