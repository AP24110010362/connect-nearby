import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { Bell, Check } from 'lucide-react';

export default function NotificationsPanel() {
  const { activePanel, notifications, markNotificationRead } = useAppStore();
  const isOpen = activePanel === 'notifications';

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: -320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -320, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="absolute top-0 left-16 bottom-0 w-80 bg-card border-r border-border z-[500] overflow-y-auto"
    >
      <div className="p-5">
        <h2 className="font-display text-xl font-bold text-card-foreground flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Notifications
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {notifications.filter((n) => !n.read).length} unread
        </p>

        <div className="mt-4 space-y-2">
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                n.read ? 'bg-background border-border' : 'bg-primary/5 border-primary/20'
              }`}
              onClick={() => markNotificationRead(n.id)}
            >
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <p className="text-sm text-card-foreground">{n.text}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                </div>
                {!n.read && (
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                )}
                {n.read && (
                  <Check className="w-3 h-3 text-accent mt-1 shrink-0" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
