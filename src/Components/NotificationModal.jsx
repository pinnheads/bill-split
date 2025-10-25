import React from 'react';
import { useNotification } from '../Context/NotificationProvider';

export default function NotificationModal() {
  const { notification, hideNotification } = useNotification();

  if (!notification) {
    return null;
  }

  // Determine colors and icon based on notification type
  const baseStyles = {
    info: {
      bgColor: 'bg-silver',
      borderColor: 'border-charcoal',
      textColor: 'text-charcoal',
      icon: 'ℹ️'
    },
    success: {
      bgColor: 'bg-white',
      borderColor: 'border-yellow-green',
      textColor: 'text-charcoal',
      icon: '✅'
    },
    error: {
      bgColor: 'bg-indian-red',
      borderColor: 'border-indian-red',
      textColor: 'text-indian-red',
      icon: '❌'
    },
  };

  const styles = baseStyles[notification.type] || baseStyles.info;

  return (
    <div className="flex items-center justify-center">
      <div className={`relative w-full p-2 rounded-lg shadow-lg border-2 ${styles.bgColor} ${styles.borderColor}`}>
        <div className="flex items-center">
          <div className="text-2xl mr-4">{styles.icon}</div>
          <p className={`text-lg ${styles.textColor}`}>{notification.message}</p>
        </div>
        {/* We only show the close button if it's not a loading message */}
        {notification.type !== 'info' && (
          <button
            onClick={hideNotification}
            className="absolute top-2 right-2 text-charcoal/20 hover:text-charcoal text-3xl"
            aria-label="Close"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
}
