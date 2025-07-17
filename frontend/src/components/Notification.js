import React, { useEffect } from 'react';
import { useNotification } from '../context/NotificationContext';
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/solid';

const notificationConfig = {
  success: {
    icon: <CheckCircleIcon className="h-6 w-6 text-green-400" />,
    barClass: 'bg-green-400',
  },
  error: {
    icon: <XCircleIcon className="h-6 w-6 text-red-400" />,
    barClass: 'bg-red-400',
  },
  info: {
    icon: <InformationCircleIcon className="h-6 w-6 text-blue-400" />,
    barClass: 'bg-blue-400',
  },
};

const Notification = ({ id, message, type, duration = 5000 }) => {
  // This assumes your context provides a 'removeNotification' function
  const { removeNotification } = useNotification();

  // Automatically close the notification after the specified duration
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        removeNotification(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, removeNotification]);

  const { icon, barClass } = notificationConfig[type] || notificationConfig.info;

  return (
    // This component would be rendered inside a fixed-position container managed by your NotificationContext
    // The animation class 'animate-fade-in-right' would be a custom animation in your tailwind.config.js
    <div className="w-full max-w-sm overflow-hidden bg-gray-800 rounded-lg shadow-lg ring-1 ring-white/10 my-2">
      <div className="flex items-start p-4">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-semibold text-gray-100">{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={() => removeNotification(id)}
            className="inline-flex text-gray-400 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
          >
            <span className="sr-only">Close</span>
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      {/* Optional progress bar for auto-dismiss */}
      <div className="h-1 w-full bg-black/20">
        <div
          className={`${barClass} h-1`}
          style={{ animation: `shrink-width ${duration}ms linear` }}
        ></div>
      </div>
    </div>
  );
};

// You would need to add keyframes for the animations in your CSS or tailwind.config.js
/*
@keyframes shrink-width {
  from { width: 100%; }
  to { width: 0%; }
}
*/

export default Notification;