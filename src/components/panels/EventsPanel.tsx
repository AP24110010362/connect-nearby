import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { Clock, Users, Plus, X, ChevronDown } from 'lucide-react';

const EVENT_CATEGORIES = [
  { label: 'Study', emoji: '📚' },
  { label: 'Sports', emoji: '🏏' },
  { label: 'Creative', emoji: '🎵' },
  { label: 'Social', emoji: '☕' },
  { label: 'Tech', emoji: '💻' },
  { label: 'Wellness', emoji: '🧘' },
];

export default function EventsPanel() {
  const { events, activePanel, rsvpEvent, setActivePanel, currentUser } = useAppStore();
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(EVENT_CATEGORIES[0]);
  const [spots, setSpots] = useState(5);
  const [hours, setHours] = useState(2);

  const isOpen = activePanel === 'events';
  if (!isOpen) return null;

  const handleCreate = () => {
    if (!title.trim()) return;
    useAppStore.getState().createEvent({
      title: `${category.emoji} ${title}`,
      category: category.label,
      emoji: category.emoji,
      creatorName: currentUser.name,
      lat: currentUser.lat + (Math.random() - 0.5) * 0.005,
      lng: currentUser.lng + (Math.random() - 0.5) * 0.005,
      spotsLeft: spots,
      totalSpots: spots,
      endsAt: new Date(Date.now() + hours * 60 * 60 * 1000).toISOString(),
    });
    setTitle('');
    setShowCreate(false);
  };

  return (
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

        <button
          onClick={() => setShowCreate(!showCreate)}
          className="w-full mt-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          {showCreate ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showCreate ? 'Cancel' : 'Create Event'}
        </button>

        {/* Create Event Form */}
        <AnimatePresence>
          {showCreate && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 p-4 rounded-xl bg-background border border-border space-y-3">
                <input
                  type="text"
                  placeholder="Event title (e.g. Study session)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-card border border-border text-sm text-card-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
                />
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Category</label>
                  <div className="flex flex-wrap gap-1.5">
                    {EVENT_CATEGORIES.map((c) => (
                      <button
                        key={c.label}
                        onClick={() => setCategory(c)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                          category.label === c.label
                            ? 'gradient-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:text-card-foreground'
                        }`}
                      >
                        {c.emoji} {c.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground mb-1 block">Spots</label>
                    <input
                      type="number"
                      min={2}
                      max={20}
                      value={spots}
                      onChange={(e) => setSpots(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-card border border-border text-sm text-card-foreground outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground mb-1 block">Duration (hrs)</label>
                    <input
                      type="number"
                      min={0.5}
                      max={8}
                      step={0.5}
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-card border border-border text-sm text-card-foreground outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
                <button
                  onClick={handleCreate}
                  disabled={!title.trim()}
                  className="w-full py-2 rounded-lg gradient-emerald text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  Create 🚀
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                    {event.attendees.length > 0 && (
                      <p className="text-[10px] text-muted-foreground mt-1">
                        👥 {event.attendees.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => rsvpEvent(event.id)}
                  className={`w-full mt-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    event.rsvped
                      ? 'bg-accent/10 text-accent'
                      : 'bg-primary/10 text-primary hover:bg-primary/20'
                  }`}
                >
                  {event.rsvped ? '✓ RSVP\'d — Tap to leave' : 'RSVP →'}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
