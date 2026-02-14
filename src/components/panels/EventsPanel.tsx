import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { Clock, MapPin, Users } from 'lucide-react';

export default function EventsPanel() {
  const { events, activePanel } = useAppStore();
  const isOpen = activePanel === 'events';

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -320, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -320, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="absolute top-0 left-16 bottom-0 w-80 bg-card border-r border-border z-[500] overflow-y-auto"
      >
        <div className="p-5">
          <h2 className="font-display text-xl font-bold text-card-foreground">Micro-Events</h2>
          <p className="text-sm text-muted-foreground mt-1">Happening near you right now</p>

          <button className="w-full mt-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            + Create Event
          </button>

          <div className="mt-5 space-y-3">
            {events.map((event) => {
              const endsAt = new Date(event.endsAt);
              const hoursLeft = Math.max(0, Math.round((endsAt.getTime() - Date.now()) / (1000 * 60 * 60) * 10) / 10);

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-background border border-border hover:shadow-card transition-shadow cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-lg shrink-0">
                      {event.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-card-foreground truncate">{event.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">by {event.creatorName}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {hoursLeft}h left
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {event.spotsLeft} spots
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-3 py-2 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                    RSVP →
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
