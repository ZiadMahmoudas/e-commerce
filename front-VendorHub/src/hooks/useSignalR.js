import { useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import toast from 'react-hot-toast';

export function useSignalR(token) {
  const connectionRef = useRef(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!token) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl('/hubs/notifications', {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    connection.on('ReceiveNotification', (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      toast.success(`🔔 ${notification.title}: ${notification.message}`, {
        duration: 5000,
        style: { background: '#1e293b', color: '#fff' },
      });
    });

    connection.start().catch(console.error);
    connectionRef.current = connection;

    return () => {
      connection.stop();
    };
  }, [token]);

  return { notifications };
}