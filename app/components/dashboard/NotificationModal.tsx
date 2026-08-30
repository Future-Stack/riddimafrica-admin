"use client";

import { Bell, Check, CheckCheck, X } from "lucide-react";
import React, { useEffect, useRef } from "react";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "warning" | "success";
}

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "New user registered",
    message: "Sarah Johnson just joined the platform.",
    time: "2 min ago",
    read: false,
    type: "info",
  },
  {
    id: 2,
    title: "Payment received",
    message: "Monthly subscription payment of $49 confirmed.",
    time: "15 min ago",
    read: false,
    type: "success",
  },
  {
    id: 3,
    title: "System alert",
    message: "Server load exceeded 80% threshold.",
    time: "1 hr ago",
    read: false,
    type: "warning",
  },
];

const typeStyles = {
  info: "bg-blue-400",
  warning: "bg-amber-400",
  success: "bg-emerald-400",
};

const NotificationModal = ({
  open,
  onClose,
}: NotificationModalProps) => {
  const [notifications, setNotifications] =
    React.useState(initialNotifications);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const markOneRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div
      ref={containerRef}
      className="fixed sm:absolute left-2 right-2 sm:left-auto sm:right-0 top-20 sm:top-14 w-auto sm:w-[360px] max-w-[360px] mx-auto sm:mx-0 bg-white rounded-2xl shadow-2xl border border-[#DFE3E880] z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#DFE3E880]">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-[#0a192f]">Notifications</h3>

          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center  gap-1 text-xs text-[#c19a56] font-medium hover:text-[#b08a48] transition-colors cursor-pointer"
            >
              <CheckCheck size={14} />
              Mark all
            </button>
          )}

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            aria-label="Close notifications"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Body */}
      <ul className="max-h-90 overflow-y-auto divide-y divide-[#DFE3E880]">
        {notifications.length === 0 ? (
          <li className="py-10 flex flex-col items-center text-gray-400">
            <Bell size={32} />
            <p className="mt-2 text-sm">No notifications</p>
          </li>
        ) : (
          notifications.map((item) => (
            <li
              key={item.id}
              onClick={() => markOneRead(item.id)}
              className={`flex gap-3 px-5 py-4 cursor-pointer hover:bg-[#FAF7F3] transition-colors ${
                !item.read ? "bg-[#f3ede4]/40" : ""
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                  item.read ? "bg-gray-300" : typeStyles[item.type]
                }`}
              />

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-[#0a192f]">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500">{item.message}</p>
                <p className="text-[11px] text-gray-400 mt-1">{item.time}</p>
              </div>

              <div className="flex gap-1 shrink-0">
                {!item.read && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markOneRead(item.id);
                    }}
                    className="text-gray-400 hover:text-[#166534] transition-colors p-1 cursor-pointer"
                    aria-label="Mark as read"
                  >
                    <Check size={14} />
                  </button>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeNotification(item.id);
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                  aria-label="Remove notification"
                >
                  <X size={14} />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};


export default NotificationModal;
