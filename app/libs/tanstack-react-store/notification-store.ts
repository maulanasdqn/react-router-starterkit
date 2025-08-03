interface NotificationItem {
  id: string;
  timestamp: number;
  title: string;
  message: string;
  type?: "success" | "error" | "warning" | "info";
}

export const notificationStore = {
  notifications: [] as NotificationItem[],
  addNotification: (notification: Omit<NotificationItem, "id" | "timestamp">) => {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    notificationStore.notifications = [
      ...notificationStore.notifications,
      { ...notification, id, timestamp },
    ];

    setTimeout(() => {
      notificationStore.removeNotification(id);
    }, 5000);
    return id;
  },
  removeNotification: (id: string) => {
    notificationStore.notifications = notificationStore.notifications.filter((n) => n.id !== id);
  },

  clearNotifications: () => {
    notificationStore.notifications = [];
  },
};
