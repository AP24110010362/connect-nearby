import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore, AvailabilityStatus } from '@/store/appStore';
import { STATUS_CONFIG } from '@/lib/constants';
import { User, Edit3, Check } from 'lucide-react';

const ALL_STATUSES: AvailabilityStatus[] = ['available', 'studying', 'open-to-chat', 'busy'];

export default function ProfilePanel() {
  const { activePanel, currentUser, updateStatus } = useAppStore();
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState(currentUser.bio);

  const isOpen = activePanel === 'profile';
  if (!isOpen) return null;

  const status = STATUS_CONFIG[currentUser.status];

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
          <User className="w-5 h-5 text-primary" />
          Your Profile
        </h2>

        {/* Avatar & Info */}
        <div className="mt-4 text-center">
          <div className="relative inline-block">
            <img
              src={currentUser.avatar}
              alt="You"
              className="w-20 h-20 rounded-full border-4 border-primary/20 bg-muted mx-auto"
            />
            <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-card ${status.dotClass}`} />
          </div>
          <h3 className="font-display text-lg font-bold text-card-foreground mt-2">{currentUser.name}</h3>
          <p className="text-sm text-muted-foreground">{currentUser.university}</p>
        </div>

        {/* Status */}
        <div className="mt-4">
          <label className="text-xs font-semibold text-card-foreground mb-2 block">Status</label>
          <div className="grid grid-cols-2 gap-2">
            {ALL_STATUSES.map((s) => {
              const conf = STATUS_CONFIG[s];
              const isActive = currentUser.status === s;
              return (
                <button
                  key={s}
                  onClick={() => updateStatus(s)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                    isActive
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-background text-muted-foreground hover:text-card-foreground'
                  }`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${conf.dotClass}`} />
                  {conf.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-card-foreground">Bio</label>
            <button
              onClick={() => setEditingBio(!editingBio)}
              className="text-xs text-primary flex items-center gap-1"
            >
              {editingBio ? <Check className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
              {editingBio ? 'Save' : 'Edit'}
            </button>
          </div>
          {editingBio ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm text-card-foreground outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              rows={3}
            />
          ) : (
            <p className="text-sm text-card-foreground/80 bg-background p-3 rounded-lg border border-border">
              {bio}
            </p>
          )}
        </div>

        {/* Interests */}
        <div className="mt-4">
          <label className="text-xs font-semibold text-card-foreground mb-2 block">Your Interests</label>
          <div className="flex flex-wrap gap-1.5">
            {currentUser.interests.map((interest) => (
              <span
                key={interest.name}
                className="text-xs px-2.5 py-1.5 rounded-full gradient-primary text-primary-foreground font-medium"
              >
                {interest.emoji} {interest.name}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            { label: 'Connections', value: 5 },
            { label: 'Events', value: 2 },
            { label: 'Helped', value: 3 },
          ].map(({ label, value }) => (
            <div key={label} className="text-center p-3 rounded-xl bg-background border border-border">
              <p className="text-lg font-bold text-card-foreground">{value}</p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
